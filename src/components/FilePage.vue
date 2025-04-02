<template v-if="localNote">
  <div id="TheHam">
    <i class="fa-solid fa-pencil" @click="enableEditor"></i>
    <i class="fa-solid fa-arrow-pointer" @click="saveNote"></i>
    <i class="fa-solid fa-bars" @click="sidebar = true"></i>
  </div>
  <div id="TheNavHam">
    <i class="fa-solid fa-pencil" @click="enableEditor"></i>
    <i class="fa-solid fa-arrow-pointer" @click="saveNote"></i>
    <i class="fa-solid fa-bars" @click="IsShowNav = true" v-show="!IsShowNav"></i>
  </div>
  <div id="publicFileHeader">
    <div id="publicFiletitle">
      <div id="publicFileName">{{ localNote.file_name }}</div>
      <div id="publicFileWriter">write by: {{ localNote.user_name }}</div>
      <div>Last Edit</div>
    </div>
    <div>
      <nav class='sidebar' v-show="sidebar">
        <p @click="sidebar = false">X</p>
        <p>On this page</p>
        <template v-if="localNoteNav" v-for="nav in localNoteNav">
          <ul class="publicFileNavUl">
            <span><a @click.prevent="clickNav(nav.id)">{{ nav.text }}</a></span>
            <template v-if="nav.children" v-for="li in nav.children">
              <li class="publicFileNavLi">
                <a @click.prevent="clickNav(nav.id)">{{ li.text }}</a>
              </li>
            </template>
          </ul>
        </template>
      </nav>
    </div>
  </div>
  <div id="publicContentAndNav">
    <div ref="fileDiv" id="fileContentArea" v-if="searchText === '' && !IntoEditor"
      class="ck-content ck-editor__editable ck">
      <template v-if="localNote">
        <component v-for="(block, index) in localNote.content" :key="index" :is="getComponent(block.type)"
          :block="block" />
      </template>
    </div>
    <div id="fakePage" v-if="searchText !== ''">
      <div v-html="fakePageHtml()"></div>
    </div>
    <div v-show="IntoEditor">
      <div id="ppp" />
    </div>
    <div id="publicFileNavArea" :class="{ mustShow: showNav }" v-show="IsShowNav">
      <div id="publicFileNav">
        <p @click="IsShowNav = false">X</p>
        <i class="fa-solid fa-share-nodes" @click="sharefile"></i>
        <i class="fa-solid fa-file-pdf"></i>
        <p id="onthispage">On this page</p>
        <template v-if="localNoteNav" v-for="nav in localNoteNav">
          <ul v-if="nav.text !== ''" :id="nav.id" class="publicFileNavUl" @mouseenter="showli = nav.id"
            @mouseleave="showli = ''">
            <span :class="{ inul: IsInUl(nav.id), scrollh2: IsScroll(nav.text) }"><a
                @click.prevent="clickNav(nav.id)">{{
                  nav.text }}</a></span>
            <template v-if="nav.children" v-for="li in nav.children">
              <li v-show="showli === nav.id" class="publicFileNavLi">
                <a @click.prevent="clickNav(li.id)">{{ li.text }}</a>
              </li>
            </template>
          </ul>
        </template>
        <p>search by text</p>
        <input v-model="searchText"></input>
        <p v-if="searchText !== ''">find {{ count }} element</p>
        <p v-if="searchText !== ''">
          <a @click.prevent="handleClick">next</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, nextTick, onUnmounted, watch } from 'vue'
import type { Note, H2Nav, } from '../types/Note'
import { get_note_nav, update_note } from '../types/Note'
import ParagraphBlock from './BlockCon/ParagraphBlock.vue'
import CustomCardBlock from './BlockCon/CustomCardBlock.vue'
import BlockQuoteBlock from './BlockCon/BlockQuoteBlock.vue'
import H2Block from './BlockCon/H2Block.vue'
import H3Block from './BlockCon/H3Block.vue'
import FigureBlock from './BlockCon/FigureBlock.vue'
const searchText = ref('');
const html = ref('');
const count = ref(0);
const goCount = ref(0);
const showNav = ref<boolean>(false);
const sidebar = ref<boolean>(false);
import { ClassicEditor, Editor } from 'ckeditor5';
import type { EditorConfig } from 'ckeditor5';
import { editorConfig } from '../types/ck'

import { getApiUrl } from '../utils/api.ts'

const ApiLink = getApiUrl();
const fileDiv = ref<HTMLElement | null>(null)
const showli = ref('');
const props = defineProps<{
  theNote: Note;
  theNoteNav: H2Nav[] | null;
}>();
const IsShowNav = ref(true);

const localNote = ref<Note>(props.theNote);
const localNoteNav = ref<H2Nav[] | null>(props.theNoteNav);

watch(
  () => props.theNote,
  (newNote) => {
    localNote.value = newNote;
  },
);

watch(
  () => props.theNoteNav,
  (newNav) => {
    localNoteNav.value = newNav;
  },
);


// 建立 type 與元件之間的對應表
const componentMap: Record<string, any> = {
  paragraph: ParagraphBlock,
  custom_card: CustomCardBlock,
  block_quote: BlockQuoteBlock,
  h2: H2Block,
  h3: H3Block,
  figure: FigureBlock
}




// 根據 block 的 type 返回對應的元件
const getComponent = (type: string) => {
  return componentMap[type] || ParagraphBlock
}

const sharefile = () => {
  const url = `https://rustlawweb.netlify.app/?user=${props.theNote.user_name}&dir=${props.theNote.directory}&file_name=${props.theNote.file_name}`
  navigator.share({
    url: url,
  })
}


// 儲存目前離 viewport 頂部最近的 h2 文字
const closestHeading = ref<string | null>(null);


const handleWindowScroll = () => {
  if (!fileDiv.value) return;
  const h2Elements = fileDiv.value.querySelectorAll('h2');
  let minDistance = Infinity;
  let closest: HTMLHeadingElement | null = null;

  h2Elements.forEach(h2 => {
    const rect = h2.getBoundingClientRect();
    const distance = Math.abs(rect.top);
    if (distance < minDistance) {
      minDistance = distance;
      closest = h2;
    }
  });

  if (closest != null) {
    closestHeading.value = (closest as HTMLHeadingElement).textContent;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleWindowScroll);
  // 初次載入時也計算一次
  handleWindowScroll();
  const editorElement = document.querySelector('#ppp') as HTMLElement
  ClassicEditor.create(editorElement, editorConfig as EditorConfig)
    .then(editor => {
      editorInstance.value = editor
      // 為 clipboardInput 事件加上處理器，將剪貼簿內容以純文字插入
      editor.editing.view.document.on('clipboardInput', (evt, data) => {
        const plainText = data.dataTransfer.getData('text/plain')
        editor.model.change(writer => {
          editor.model.insertContent(writer.createText(plainText))
        })
        evt.stop() // 阻止事件進一步傳播，避免重複處理
      }, { priority: 'highest' })
    })
    .catch(error => {
      console.error('There was a problem initializing the editor:', error)
    })
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleWindowScroll);
});

// 控制是否進入編輯模式的變數
const IntoEditor = ref(false)
// 儲存 CKEditor 實例（以便後續操作）

import { shallowRef } from 'vue'
const editorInstance = shallowRef<Editor | null>(null)
// 用來參考編輯器掛載的 DOM 元素
const editorContainer = ref<HTMLElement | null>(null)

const enableEditor = async () => {
  let htmlContent = fileDiv.value?.innerHTML;
  IntoEditor.value = true
  await nextTick();
  // 在組件掛載後取得 DOM 並初始化 CKEditor
  if (htmlContent === null) {
    (editorInstance.value as Editor).setData("<p>加入文字</p>")
  } else {
    // let htmlContent = await SSR(n);
    (editorInstance.value as Editor).setData(htmlContent as string);
  }
}

const saveNote = async () => {
  if (IntoEditor.value) {
    if (editorInstance) {
      let contentString = (editorInstance.value as Editor).getData();
      let resNote = await update_note(ApiLink, localNote.value.id, contentString);
      if (resNote) {
        localNote.value = resNote;
      }
      await nextTick();
      localNoteNav.value = await get_note_nav(ApiLink, localNote.value.id);
    }
    await nextTick();
    IntoEditor.value = false;
  }
}


const handleClick = () => {
  if (goCount.value === count.value) {
    goCount.value = 0;
  } else {
    goCount.value += 1;
  }
  // 更新完成後手動設定 hash（或依需求處理）
  nextTick(() => {
    const element = document.getElementById(`FindingText-${goCount.value}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
};

const clickNav = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

const fakePageHtml = function () {
  html.value = fileDiv.value?.innerHTML as string;
  if (!html.value.includes(searchText.value)) {
    return "找不到" + searchText.value
  } else {
    count.value = 0;
    let buffer = html.value.replace(new RegExp(searchText.value, "g"), () => {
      count.value++;
      return `<span class='highlight' id='FindingText-${count.value}'>${searchText.value}</span>`
    });
    return buffer
  }
}

// let observer: MutationObserver | null = null;
const IsInUl = function (id: string) {
  if (id === showli.value) {
    return true
  }
  return false
}
const IsScroll = function (id: string) {
  if (id === closestHeading.value) {
    return true
  }
  return false
}



</script>

<style scoped>
#ppp {
  display: flex !important;
}


#publicContentAndNav {
  display: flex;
  gap: 20px;
}

#fileContentArea,
#fakePage {
  flex: 60%;
}

#publicFileNavArea {
  flex: 30%;
  position: sticky;
}

#publicFileNav {
  margin-left: 0px;
  padding-left: 0px;
  position: sticky;
  top: 10%;
}

.publicFileNavUl {
  margin: 3px 10px;
  padding: 0;
}

.publicFileNavUl li:hover {
  color: var(--primary-color) !important;
  font-weight: 700px;
  cursor: pointer;
  border-left: 1px solid var(--primary-color) !important;
}

.publicFileNavLi a:hover {
  color: var(--primary-color) !important;
}

.publicFileNavUl a:hover {
  color: var(--primary-color) !important;
}


.publicFileNavUl li {
  padding-left: 10px;
  list-style: none;
  cursor: pointer;
  border-left: 1px solid var(--gray-color);

}


.publicFileNavUl span {
  padding: 5px;
  cursor: pointer;
  padding-left: 7px;
  border-left: 1px solid var(--gray-color);
}


.inul {
  font-weight: bold;
  color: var(--primary-color);
  cursor: pointer;
  border-left: 1px solid var(--gray-color) !important;
}

.scrollh2 {
  border-left: 1px solid var(--primary-color) !important;
}

a {
  color: white;
  text-decoration: none;
}

#publicFileName {
  font-size: 2rem;
  margin: 10px 0px;
  font-weight: 900;
}

#publicFileWriter {
  font-size: 1.2rem;
  font-weight: 500;
}

#publicFileHeader {
  display: flex;
  align-items: center;
}

#sharePage,
#PrintPDF {
  flex: 15%;
}

#sharePage,
#PrintPDF {
  font-size: 1.2rem;
}


#publicFiletitle {
  flex: 40%;
}

i {
  margin-left: 20px;
  font-size: 20px;
}

#toggle {
  display: none;
  position: fixed;
  top: 50%;
  right: 0%;
  font-size: 50px;
}



@media only screen and (max-width: 600px) {
  #publicFileNavArea {
    display: none;
  }

  #toggle {
    display: block;
    position: fixed;
  }

  #TheHam {
    display: flex !important;
    position: sticky;
    align-items: flex-end;
    justify-items: flex-end;
    justify-content: flex-end;
  }

  .fa-bars::before {
    margin-right: 30px;
  }

  #TheNavHam {
    display: none !important;
  }
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 250px;
  z-index: 999;
  opacity: 0.8;
  background-color: black;
  list-style: none;
}

.sidebar p {
  margin-left: 10px;
}

#TheHam {
  display: none;
  top: 11%;
  right: 100% !important;
}

#TheNavHam {
  z-index: 999;
}

#TheNavHam {
  display: flex;
  position: sticky;
  align-items: flex-end;
  justify-items: flex-end;
  justify-content: flex-end;
  top: 11%;
  right: 100% !important;
}
</style>

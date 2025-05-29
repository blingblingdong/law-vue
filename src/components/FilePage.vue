<template v-if="localNote">
  <div v-if="account.username === localNote.user_name">
    <p class="save-or-edit" v-if="IntoEditor" @click="saveNote">save</p>
    <p class="save-or-edit" v-if="!IntoEditor" @click="enableEditor">edit</p>
  </div>
  <div id="TheNavHam">
    <i class="fa-solid fa-bars" @click="IsShowNav = true" v-show="!IsShowNav"></i>
  </div>
  <div id="publicFileHeader">
    <div id="publicFiletitle">
      <div id="publicFileName">
        <template v-if="!changing_name">
          <span>{{ localNote.file_name }}</span>
          <template v-if="account.username === localNote.user_name">
            <i class="fa-solid fa-pen" @click="changing_name = true"></i>
            <i class="fa-solid fa-trash" @click="deletenote"></i>
          </template>
        </template>
        <template v-else>
          <input v-model="changingnewname"></input>
          <i class="fa-solid fa-check" @click="change_name(changingnewname)"></i>
          <i class="fa-solid fa-xmark" @click="changing_name = false"></i>
        </template>
      </div>
      <div id="publicFileWriter">write by: {{ localNote.user_name }}</div>
      <div>Last Edit： {{ date?.toDateString() }}</div>
      <div>State：
        <span v-if="localNote.public">released
          <i class="fa-regular fa-circle-check" @click="change_state"
            v-if="account.username === localNote.user_name"></i>
        </span>
        <span v-else>private
          <i class="fa-regular fa-circle" v-if="account.username === localNote.user_name" @click="change_state"></i>
        </span>
      </div>
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
  <div id="content-table">
    <p>table of content</p>
    <template v-if="localNoteNav" v-for="nav in localNoteNav">
      <ul v-if="nav.text !== ''" :id="nav.id" class="publicFileNavUl" @mouseenter="showli = nav.id"
        @mouseleave="showli = ''">
        <span :class="{ inul: IsInUl(nav.id), scrollh2: IsScroll(nav.text) }"><a @click.prevent="clickNav(nav.id)">{{
          nav.text }}</a></span>
        <template v-if="nav.children" v-for="li in nav.children">
          <li v-show="showli === nav.id" class="publicFileNavLi">
            <a @click.prevent="clickNav(li.id)">{{ li.text }}</a>
          </li>
        </template>
      </ul>
    </template>
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
      <div ref="editorMountPoint" />
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
        <p v-if="searchText !== ''" id="searchbytextbtn">
          <a @click.prevent="handleClick" id="nextbtn">next</a>
          <a @click.prevent="handleClick" id="prebtn">pre</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, nextTick, onUnmounted, watch } from 'vue'
import type { Note, H2Nav, } from '../types/Note'
import { get_note_nav, update_note, update_note_name, update_note_state, delete_note, get_note_date, update_note_date } from '../types/Note'
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
import { useAccountStore } from '../store/page.ts'
import { getApiUrl } from '../utils/api.ts'
import swal from 'sweetalert'



const account = useAccountStore();
const deletenote = async () => {
  const willDelete = await swal({
    title: "Are you sure?",
    text: "Are you sure that you want to delete this file?",
    icon: "warning",
    dangerMode: true,
  });

  if (willDelete) {
    let res = await delete_note(ApiLink, localNote.value.id);
    if (res) {
      swal("Deleted!", `${localNote.value.id} has been deleted!`, "success");
    } else {
      swal("Oops!", "Seems like we couldn't fetch the info", "error");
    }
  }
}




const ApiLink = getApiUrl();
const fileDiv = ref<HTMLElement | null>(null)
const showli = ref('');
const props = defineProps<{
  theNote: Note;
  theNoteNav: H2Nav[] | null;
}>();
const IsShowNav = ref(true);
const date = ref<Date | null>(null);

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


const editorMountPoint = ref<HTMLElement | null>(null)

onMounted(async () => {

  window.addEventListener('scroll', handleWindowScroll);
  // 初次載入時也計算一次
  handleWindowScroll();
  if (!editorMountPoint.value) return
  ClassicEditor.create(editorMountPoint.value, editorConfig as EditorConfig)
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

  date.value = await get_note_date(ApiLink, localNote.value.id);
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
  IsShowNav.value = false;
}

const saveNote = async () => {
  if (IntoEditor.value) {
    if (editorInstance) {
      let contentString = (editorInstance.value as Editor).getData();
      let resNote = await update_note(ApiLink, localNote.value.id, contentString);
      const now = new Date();
      let resdate = await update_note_date(ApiLink, localNote.value.id, now.toISOString());
      if (resNote && resdate) {
        localNote.value = resNote;

        date.value = new Date(Date.now());
      }
      await nextTick();
      localNoteNav.value = await get_note_nav(ApiLink, localNote.value.id);
    }
    await nextTick();
    IntoEditor.value = false;
  }
  IsShowNav.value = true;
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


const changingnewname = ref('');
const changing_name = ref(false);
const change_name = async (newname: string) => {
  changing_name.value = true;
  let res = await update_note_name(ApiLink, localNote.value.id, newname);
  await nextTick();
  if (res) {
    localNote.value = res;
  } else {
    alert("換名失敗！")
  }
  changing_name.value = false;
}

const change_state = async () => {
  let state = localNote.value.public ? "false" : "true";
  let res = await update_note_state(ApiLink, localNote.value.id, state);
  await nextTick();
  res ? localNote.value.public = !localNote.value.public : alert("切換失敗");
}
</script>

<style scoped>
#content-table {
  margin-top: 20px;
  display: none;
}


#searchbytextbtn {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}


#nextbtn:hover,
#prebtn:hover {
  color: var(--primary-color);
  cursor: pointer;


}


input {
  background-color: var(--gray-color) !important;
  padding: 5px;
  border-radius: 5px;
}

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
  overflow-y: auto;
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
  color: var(--text-color);
  text-decoration: none;
}

#publicFileName {
  font-size: 2rem;
  margin: 10px 0px;
  font-weight: 900;
  display: flex;
  align-items: center;
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
  #content-table {
    display: block;
  }

  #publicFileNavArea {
    display: none;
  }

  #toggle {
    display: block;
    position: fixed;
  }


  .fa-bars::before {
    margin-right: 30px;
    display: none;
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


#TheNavHam {
  z-index: 999;
}

#TheNavHam {
  display: flex;
  position: sticky;
  align-items: flex-end;
  justify-items: flex-end;
  justify-content: flex-end;
  top: 5%;
  right: 95% !important;
}

.save-or-edit {
  position: fixed;
  bottom: 0%;
  right: 50%;
  border: 1px solid var(--text-color);
  padding: 5px;
  border-radius: 4px;
  background-color: var(--text-color);
  color: var(--bg-color);
  z-index: 999;
}

.save-or-edit:hover {
  background-color: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
}
</style>

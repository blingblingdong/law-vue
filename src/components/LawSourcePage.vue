<script setup lang="ts">
import { defineProps, ref, onMounted, computed, watch, type Component, markRaw } from 'vue'
// @ts-expect-error
import { RecycleScroller } from 'vue3-virtual-scroller'
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'
import NewinterpretationBlock from './SourceCon/NewinterpretationBlock.vue'
import OldinterpretationBlock from './SourceCon/OldinterpretationBlock.vue'
import ResolutionBlock from './SourceCon/ResolutionBlock.vue'
import PrecedentBlock from './SourceCon/PrecedentBlock.vue'
import LawPage from './LawPage.vue'
import Folder from './Folder.vue'
import { get_note, get_note_nav } from '../types/Note.ts'
import { get_folder } from '../types/Folder.ts'
import FilePage from './FilePage.vue'
import swal from 'sweetalert'

interface WorkingItem {
  item: othersourceitem,
  con: Component,
  locked: boolean,
  data?: any,
  position: number,
}

const workingitemlist = ref<WorkingItem[]>([]);
const showingitem = ref<null | string>(null);

async function pushworkingitem(pushingitem: othersourceitem): Promise<boolean> {

  // 1.先找有沒有重複
  let duplicate_flag = false;
  workingitemlist.value.forEach(theitem => {
    if (theitem.item.name === pushingitem.name) {
      duplicate_flag = true;
    }
  })

  //2.如果沒有重複
  if (!duplicate_flag) {


    let buffer = await finditem(pushingitem);
    if (buffer == null) {
      return false
    }

    workingitemlist.value.push(buffer);

    workingitemlist.value = [
      ...workingitemlist.value.filter(item => !item.locked),
      ...workingitemlist.value.filter(item => item.locked),

    ]

    if (workingitemlist.value.length > 5) {
      workingitemlist.value.shift() // 移除最前面那個（應是可刪的）
    }


  }
  return true


}

async function finditem(pushingitem: othersourceitem): Promise<WorkingItem | null> {
  let buffer: WorkingItem = {
    item: pushingitem,
    con: markRaw(get_style(pushingitem.sourcetype).con),
    locked: false,
    position: 0
  };
  buffer.item = pushingitem;
  //2.1找component 
  if (buffer.item.sourcetype === 'lawname') {
    buffer.data = { chapter: buffer.item.name }
  } else if (buffer.item.sourcetype === 'note') {
    const [username, foldername, notename] = buffer.item.id.split("-");
    const note = await get_note(ApiLink, username, foldername, notename)
    const notenav = await get_note_nav(ApiLink, buffer.item.id);
    if (note && notenav) {
      buffer.data = { theNote: note, theNoteNav: notenav }
    } else {
      return null
    }
  } else if (buffer.item.sourcetype === 'folder') {
    const [username, foldername] = buffer.item.id.split("-");
    const folder = await get_folder(ApiLink, username, foldername);
    if (folder) {
      buffer.data = { TheDirectory: folder }
    }
  }
  else {
    const res = await fetch(`${ApiLink}/${buffer.item.sourcetype}/${buffer.item.id}`);
    if (!res.ok) {
      return null
    }
    const resdata = await res.json();
    buffer.data = { datax: resdata };
  }
  return buffer
}



const search = ref<String | null>(null);
const searchtype = ref("all");
const placeholder = ref("");
const data = ref();
const othersourcelist = ref<null | othersourceitem[]>(null);
import { getApiUrl } from '../utils/api'
const ApiLink = getApiUrl();
const history = ref<othersourceitem[]>([]);
import { useUiStore } from '../store/page.ts'
import { nextTick } from 'vue'
const ui = useUiStore()


onMounted(async () => {
  const raw = localStorage.getItem("sourcename");
  if (!raw) {
    history.value = [];
    return
  } else {
    history.value = JSON.parse(raw);
  }

  if (ui.searchItem.name !== "") {
    clickitem(ui.searchItem)
  }
})


watch(
  () => ui.searchItem,
  (item) => {
    clickitem(item);
  }
)



onMounted(async () => {
  othersourcelist.value = [];
  style_vec.filter(item => item.sourcetype !== 'all').forEach(async item => {
    const list = await getlawsourcelist(item.sourcetype);
    othersourcelist.value = othersourcelist.value?.concat(list) as othersourceitem[];
  });
})





const clicktype = async (sourcetype: string) => {
  searchtype.value = sourcetype;
  search.value = "";
  showlist.value = false;
  if (sourcetype === "all") {
    othersourcelist.value = [];
    style_vec.forEach(async item => {
      const list = await getlawsourcelist(item.sourcetype);
      othersourcelist.value = othersourcelist.value?.concat(list) as othersourceitem[];
    });
    return
  }
  othersourcelist.value = await getlawsourcelist(sourcetype);
}

interface OtherLawSourceStyle {
  sourcetype: string,
  color: string,
  name: string,
  con: Component,
}



let style_vec: OtherLawSourceStyle[] = [
  { sourcetype: "newinterpretation", color: "darkblue", name: "憲判字", con: NewinterpretationBlock },
  { sourcetype: "oldinterpretation", color: "#cc6699", name: "舊釋字", con: OldinterpretationBlock },
  { sourcetype: "precedent", color: "darkred", name: "判例", con: PrecedentBlock },
  { sourcetype: "resolution", color: "#ff6600", name: "決議", con: ResolutionBlock },
  { sourcetype: "lawname", color: "darkgreen", name: "法條", con: LawPage },
  { sourcetype: "all", color: "purple", name: "全域!", con: LawPage },
  { sourcetype: "note", color: "darkgreen", name: "筆記", con: FilePage },
  { sourcetype: "folder", color: "darkgreen", name: "資料夾", con: Folder },
];



const get_style = (sourcetype: string): OtherLawSourceStyle => {
  let returned_style = style_vec[0];
  style_vec.forEach(item => {
    if (item.sourcetype === sourcetype) {
      returned_style = item;
    }
  });
  return returned_style;
}

let filter_list = ref<othersourceitem[] | null>(null);

const inputing = () => {
  isinclude(searchtype.value);
}

function isinclude(sourcetype: string) {
  if (search.value != null) {
    const val = search.value.toString();
    if (sourcetype === "oldinterpretation" && othersourcelist.value) {

      filter_list.value = othersourcelist.value.filter(item => {
        return item.id === val;
      });
    } else if (sourcetype === "newinterpretation" && othersourcelist.value) {
      filter_list.value = othersourcelist.value.filter(item => {
        return item.name.includes(val);
      });
    } else if (sourcetype === "resolution" && othersourcelist.value) {
      filter_list.value = othersourcelist.value.filter(item => {
        return item.name.includes(val);
      })
        ;
    } else if (sourcetype === "lawname" && othersourcelist.value) {
      filter_list.value = othersourcelist.value.filter(item => {
        return item.name.includes(val);
      })
        ;
    } else if (sourcetype === "precedent" && othersourcelist.value) {
      filter_list.value = othersourcelist.value.filter(item => {
        return item.name.includes(val);
      })
        ;
    } else if (sourcetype === "all" && othersourcelist.value) {
      filter_list.value = othersourcelist.value.filter(item => {
        return item.name.includes(val);
      })
        ;
    } else if (sourcetype === "note" && othersourcelist.value) {
      filter_list.value = othersourcelist.value.filter(item => {
        return item.name.includes(val);
      })
        ;
    }

  }

}

interface othersourceitem {
  name: string,
  id: string,
  sourcetype: string,
}

async function getlawsourcelist(type: string): Promise<othersourceitem[]> {

  if (type === 'note') {
    const res = await fetch(`${ApiLink}/${type}list/test_user`);
    const listdata = await res.json() as othersourceitem[];
    return listdata
  } else {
    try {
      const res = await fetch(`${ApiLink}/${type}list`);
      const listdata = await res.json() as othersourceitem[];
      return listdata
    } catch (e) {
      console.error("載入資料失敗:", e);
      return []
    }
  }

};





const nowarea = ref("search");
const clickitem = async (item: othersourceitem) => {
  workingitemlist.value.forEach(item => {
    if (item.item.name === showingitem.value) {
      item.position = window.scrollY;
    }
  });
  await nextTick();
  let res = await pushworkingitem(item);
  if (res) {
    history.value = history.value.filter(historyitem => historyitem.name !== item.name);
    history.value.push(item);
    localStorage.setItem("sourcename", JSON.stringify(history.value))
    nowarea.value = 'result';
    showingitem.value = item.name;
    await nextTick();
    workingitemlist.value.forEach(
      workingitem => {
        if (workingitem.item.name === item.name) {
          const y = workingitem.position;
          window.scrollTo({ top: y });
        }
      }
    )
  } else {
    swal("發生錯誤，該資源不存在，或網路壞去!");
    history.value = history.value.filter(historyitem => historyitem.name !== item.name);
    localStorage.setItem("sourcename", JSON.stringify(history.value))
  }
}

const closeitem = (item: othersourceitem) => {
  workingitemlist.value = workingitemlist.value.filter(theitem => theitem.item !== item)
  nowarea.value = 'search';
}


const backtosearch = async () => {
  workingitemlist.value.forEach(item => {
    if (item.item.name === showingitem.value) {
      item.position = window.scrollY;
    }
  });
  await nextTick();
  nowarea.value = 'search';
  showingitem.value = "";
}


const reversedHistory = computed(() => {
  return [...history.value].reverse();
});

const reversedTags = computed(() => {
  return [...workingitemlist.value].reverse();
});


const showlist = ref(false);



</script>

<template>
  <div id="lawsourcepage">
    <div id="tag-area">
      <div v-for="workingitem in reversedTags" :class="{ 'onthisitem': workingitem.item.name === showingitem }">
        <i class="fa-solid fa-xmark" @click="closeitem(workingitem.item)" v-if="!workingitem.locked"></i>
        <i class="fa-solid fa-lock" v-if="workingitem.locked"></i>

        <span @click="clickitem(workingitem.item)">{{ ' ' + workingitem.item.name }}</span>
      </div>
    </div>



    <div id="search-area" v-show="nowarea === 'search'">
      <div id="inputRow">
        <input v-model="search" :placeholder="placeholder" @input="inputing">
        <div class="sourrcetypelist">
          <div class="selected" :style="{ 'background-color': get_style(searchtype).color }"><i
              class="fa-solid fa-chevron-down" v-show="!showlist" @click="showlist = true"></i>
            <i class="fa-solid fa-chevron-up" v-show="showlist" @click="showlist = false"></i>

            <p>{{ get_style(searchtype).name }}</p>
          </div>
          <ul id="dropdown">
            <li v-show="showlist" v-for="item in style_vec" @click="clicktype(item.sourcetype)"><i
                class="fa-solid fa-circle" :style="{ color: get_style(item.sourcetype).color }"></i>
              {{ item.name }}</li>
          </ul>
        </div>
      </div>

      <div>
        <p>history：</p>
        <div id="historylist" v-if="history">
          <template v-if="history">
            <div v-for="item in reversedHistory" class="historyitem" @click="clickitem(item)">{{ item.name.trim() }}
            </div>

          </template>
        </div>
      </div>

      <div id="alloptionlist" v-if="othersourcelist && !search">
        <RecycleScroller :items="othersourcelist" :item-size="50" key-feild="id" class="scroller">
          <template #default="{ item }">
            <div :sourcetype="item.sourcetype" :id="item.id" @click=" clickitem(item)" class="item">
              <div class="sourcetag">
                <p :style="{ 'background-color': get_style(item.sourcetype).color }">{{ get_style(item.sourcetype).name
                  }}
                </p>
              </div>
              <div class="itemname">{{ item.name }}</div>
            </div>
          </template>
        </RecycleScroller>
      </div>
      <div id="inputoptionlist" v-if="search">
        <RecycleScroller :items="filter_list" :item-size="50" key-feild="id" class="scroller">
          <template #default="{ item }">
            <div :sourcetype="item.sourcetype" :id="item.id" @click=" clickitem(item)" class="item">
              <div class="sourcetag">
                <p :style="{ 'background-color': get_style(item.sourcetype).color }">{{ get_style(item.sourcetype).name
                  }}
                </p>
              </div>
              <div class="itemname">{{ item.name }}</div>
            </div>
          </template>
        </RecycleScroller>
      </div>
    </div>


    <div id="result-area" v-if="nowarea === 'result'">
      <div v-for="(w, i) in workingitemlist" v-show="showingitem && w.item.name === showingitem">
        <div id="backtosearch">
          <i class="fa-solid fa-arrow-left" @click="backtosearch"></i>
          <i class="fa-solid fa-lock" @click="w.locked = false" v-if="w.locked == true"></i>
          <i class="fa-solid fa-lock-open" @click="w.locked = true" v-if="w.locked == false"></i>
        </div>
        <component :key="i" :is="w.con" v-bind="w.data" />
      </div>
    </div>

  </div>

</template>



<style scoped>
#backtosearch {
  position: sticky;
  top: 5%;
  gap: 10px;
  display: flex;
  font-size: 20px;
}

#backtosearch i:hover {
  color: var(--primary-color);
  cursor: pointer;
}


#tag-area {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: flex-start;
  gap: 2px;
  position: sticky;
  top: 0%;
}

#tag-area div {
  padding: 5px 10px;
  text-align: left;
  white-space: nowrap;
  overflow-x: auto;
  font-size: 12px;
  border-radius: 4px;
  background-color: var(--gray-color)
}

@media only screen and (max-width: 500px) {
  #tag-area div {
    font-size: 10px;
  }

}


#tag-area div:hover {
  cursor: pointer;
}

.historyitem:hover {
  color: var(--primary-color);
  cursor: pointer;
}

.selected {
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.selected p {
  margin: 5px;
}

.sourrcetypelist {
  list-style: none;
  position: relative;
  z-index: 1000;
  margin: 0px;
  width: 100px;
  padding: 0px;
}

#dropdown {
  list-style: none;
  top: 100%;
  left: 0;
  right: 0;
  padding: 0;
  margin-left: 0;
  margin: 0px;
  position: absolute;
  background-color: black;
}

#dropdown li {
  margin: 10px;
  padding: 5px;
}

#dropdown li:hover {
  cursor: pointer;
  background-color: var(--text-color);
  color: black;
}


#historylist {
  display: flex;
  gap: 10px;
  max-height: 100px;
  overflow-y: auto;
  flex-wrap: wrap;
}

#search-area {
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.historyitem {
  padding: 5px;
  background-color: var(--gray-color);
  border-radius: 5px;
}


#lawsourcepage {
  gap: 10px;
  margin-top: 10px;
  flex-direction: column;
  display: flex;
}

.item:hover {
  color: var(--primary-color);
  cursor: pointer;
}


.scroller {
  height: 500px;
  /* 清單最大高度 */
  overflow-y: auto;
}

.item {
  display: grid;
  justify-content: flex-start;
  text-align: center;
  gap: 15px;
  grid-template-columns: 2fr 7fr;
}

.sourcetag {
  display: flex;
  gap: 5px;
  align-items: center;
  align-content: center;
}

.sourcetag p {
  margin: 0px;
  font-size: 14px;
  padding: 5px;
  border-radius: 5px;
  font-weight: 500;
}



#search-type {
  display: flex;
  gap: 10px;
  justify-content: center;
}

#inputRow {
  display: grid;
  grid-template-columns: 9fr 1fr;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-color);
  border-radius: 10px;

}

#inputRow p {
  font-size: 14px;
}

#showsearchtype {
  flex: 20%;
}

#inputRow input {
  padding: 15px;
  flex-shrink: 0;
  width: 70%;
  border: none;

}

input:focus {
  border: none;
}

.itemname {
  text-align: left;
}

.onthisitem {
  color: black !important;
  background-color: var(--text-color) !important;
}

/* 讓表單內容更居中美觀 */
</style>

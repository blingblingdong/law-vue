<script setup lang="ts">
import { defineProps, ref, onMounted, computed } from 'vue'
// @ts-expect-error
import { RecycleScroller } from 'vue3-virtual-scroller'
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'
import AllLines from "./LawPageCon/AllLines.vue"
import NewinterpretationBlock from './SourceCon/NewinterpretationBlock.vue'
import OldinterpretationBlock from './SourceCon/OldinterpretationBlock.vue'
import ResolutionBlock from './SourceCon/ResolutionBlock.vue'
import PrecedentBlock from './SourceCon/PrecedentBlock.vue'


const search = ref<String | null>(null);
const searchtype = ref("all");
const placeholder = ref("");
const data = ref();
const othersourcelist = ref<null | othersourceitem[]>(null);
const displaysourcelist = ref<null | othersourceitem[]>(null);
import { getApiUrl } from '../utils/api.ts'
const pagenum = ref(0)
const ApiLink = getApiUrl();
const history = ref<othersourceitem[]>([]);

onMounted(async () => {
  const raw = localStorage.getItem("sourcename");
  if (!raw) {
    history.value = [];
    return
  } else {
    history.value = JSON.parse(raw);
  }
})

onMounted(async () => {
  othersourcelist.value = [];
  style_vec.forEach(async item => {
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
}



let style_vec: OtherLawSourceStyle[] = [
  { sourcetype: "newinterpretation", color: "darkblue", name: "憲判字" },
  { sourcetype: "oldinterpretation", color: "#cc6699", name: "舊釋字" },
  { sourcetype: "precedent", color: "darkred", name: "判例" },
  { sourcetype: "resolution", color: "#ff6600", name: "決議" },
  { sourcetype: "lawname", color: "darkgreen", name: "法條" },
  { sourcetype: "all", color: "purple", name: "全域!" }
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
    }
  }

}

interface othersourceitem {
  name: string,
  id: string,
  sourcetype: string,
}

async function getlawsourcelist(type: string): Promise<othersourceitem[]> {

  try {
    const res = await fetch(`${ApiLink}/${type}list`);
    const listdata = await res.json() as othersourceitem[];
    return listdata
  } catch (e) {
    console.error("載入資料失敗:", e);
    return []
  }
};

import type { Law, LawList, ChapterUl } from '../types/Law.ts'
import { get_all_lawList, getChapterList, load_chapter_datalist } from '../types/Law.ts'


const realchapter = ref('');
const lawdata = ref<null | LawList[]>(null);
const chapterlist = ref<null | ChapterUl[]>(null);
const nowareatype = ref('');
const nowarea = ref("search");


const getlawsource = async (item: othersourceitem) => {
  history.value = history.value.filter(historyitem => historyitem.name !== item.name);
  history.value.push(item);
  localStorage.setItem("sourcename", JSON.stringify(history.value))
  nowarea.value = 'result';
  if (item.sourcetype === "lawname") {
    realchapter.value = item.name;
    lawdata.value = await get_all_lawList(realchapter.value, ApiLink);
    chapterlist.value = await getChapterList(realchapter.value, ApiLink);
    nowareatype.value = item.sourcetype;
    return
  }

  try {
    const res = await fetch(`${ApiLink}/${item.sourcetype}/${item.id}`);
    data.value = await res.json();
    alert(data.value.no);
  } catch (e) {
    console.error("載入資料失敗:", e);
    console.log(`${item.sourcetype}、${item.id}`)
  }
  nowareatype.value = item.sourcetype;

};

const backtosearch = () => {
  nowarea.value = 'search';
  data.value = null;
}


const reversedHistory = computed(() => {
  return [...history.value].reverse();
});

const showlist = ref(false);



</script>

<template>
  <div id="lawsourcepage">
    <div id="search-area" v-show="nowarea === 'search'">
      <div id="inputRow">
        <input v-model="search" :placeholder="placeholder" @input="inputing">
        <div class="sourrcetypelist">
          <div @click="showlist = true" class="selected" :style="{ 'background-color': get_style(searchtype).color }"><i
              class="fa-solid fa-chevron-down" v-show="!showlist"></i>
            <i class="fa-solid fa-chevron-up" v-show="showlist"></i>

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
            <div v-for="item in history" class="historyitem" @click="getlawsource(item)">{{ item.name.trim() }}
            </div>

          </template>
        </div>
      </div>

      <div id="alloptionlist" v-if="othersourcelist && !search">
        <RecycleScroller :items="othersourcelist" :item-size="50" key-feild="id" class="scroller">
          <template #default="{ item }">
            <div :sourcetype="item.sourcetype" :id="item.id" @click=" getlawsource(item)" class="item">
              <div class="sourcetag">
                <i class="fa-solid fa-circle" :style="{ color: get_style(item.sourcetype).color }"></i>
                <p>{{ get_style(item.sourcetype).name }}</p>
              </div>
              <div class="itemname">{{ item.name }}</div>
            </div>
          </template>
        </RecycleScroller>
      </div>
      <div id="inputoptionlist" v-if="search">
        <RecycleScroller :items="filter_list" :item-size="50" key-feild="id" class="scroller">
          <template #default="{ item }">
            <div :sourcetype="item.sourcetype" :id="item.id" @click=" getlawsource(item)" class="item">
              <div class="sourcetag">
                <i class="fa-solid fa-circle" :style="{ color: get_style(item.sourcetype).color }"></i>
                <p>{{ get_style(item.sourcetype).name }}</p>
              </div>
              <div class="itemname">{{ item.name }}</div>
            </div>
          </template>
        </RecycleScroller>
      </div>
    </div>


    <div id="result-area" v-if="nowarea === 'result'">
      <div @click="backtosearch">
        search again
      </div>
      <div v-if="nowareatype === 'oldinterpretation'">
        <OldinterpretationBlock :datax="data" />
      </div>
      <div v-if="nowareatype === 'precedent'">
        <PrecedentBlock :datax="data" />
      </div>
      <div v-if="nowareatype === 'resolution'">
        <ResolutionBlock :datax="data" />
      </div>
      <div v-else-if="nowareatype === 'newinterpretation'">
        <NewinterpretationBlock :datax="data" />
      </div>
      <div id="lawnameresult" v-else-if="nowareatype === 'lawname'">
        <AllLines v-if="lawdata" :chapter="realchapter" :LawLists="lawdata" :UlLists="chapterlist" />
      </div>
    </div>





  </div>

</template>



<style scoped>
.selected {
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 5px;
}

.selected p {
  margin: 5px;
}

.sourrcetypelist {
  list-style: none;
  position: relative;
  z-index: 10;
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
  background-color: white;
  color: black;
}


#historylist {
  display: flex;
  gap: 10px;
  max-height: 100px;
  overflow-y: auto;
  flex-wrap: wrap-reverse;
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
  background-color: white;
  color: black;
  padding: 5px;
}


.scroller {
  height: 500px;
  /* 清單最大高度 */
  overflow-y: auto;
}

.item {
  display: flex;
  align-items: center;
  text-align: center;
  gap: 25px;
}

.sourcetag {
  display: flex;
  gap: 5px;
  align-items: center;
}


#search-type {
  display: flex;
  gap: 10px;
  justify-content: center;
}

#inputRow {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background-color: black;
  border-radius: 10px;
  border: 1px solid white;

}

#showsearchtype {
  flex: 20%;
}

#inputRow input {
  padding: 15px;
  flex-shrink: 0;
  width: 70%;
  background-color: black;
  border: none;

}

input:focus {
  border: none;
}


/* 讓表單內容更居中美觀 */
</style>

<script setup lang="ts">
import { ref } from 'vue'
import AllLines from "./LawPageCon/AllLines.vue"
import Text from "./LawPageCon/Text.vue"
import Chapter from "./LawPageCon/Chapter.vue"
import type { Law, LawList, ChapterUl } from '../types/Law.ts'
import { get_all_lawList, getChapterList, load_chapter_datalist } from '../types/Law.ts'


const realchapter = ref('');
const chapterlist = ref<null | ChapterUl[]>(null);
const lawlist = ref<null | LawList[]>(null);

import { getApiUrl } from '../utils/api.ts'

const ApiLink = getApiUrl();
const chapterOption = ref<null | string>("");


interface PageListType {
  page: string;
  isActive: boolean;
}

const NowPage = ref('All');
const inputChapter = ref('')
const PageList = ref<PageListType[]>([
  { page: "All", isActive: true }, { page: "Chapter", isActive: false }, { page: "Text", isActive: false }, { page: "About", isActive: false }
]);

const HandlePage = function (pageObj: PageListType) {
  PageList.value.forEach(item => {
    item.isActive = (item.page === pageObj.page);
  });
  NowPage.value = pageObj.page;
}


const send = async (event: Event) => {
  event.preventDefault();
  realchapter.value = inputChapter.value;
  lawlist.value = await get_all_lawList(realchapter.value, ApiLink);
  chapterlist.value = await getChapterList(realchapter.value, ApiLink);
  chapterOption.value = await load_chapter_datalist(realchapter.value, ApiLink);
}
</script>

<template>


  <div id="test-area">
    <div id="law-search-area">
      <form id="law-search-area-form">
        <input list="law-name-data" id="search-chapter" v-model="inputChapter">
        <button type="submit" @click="send">查尋</button>
        <button type="reset" id="reset">清除</button>
      </form>
      <ul class="law-search-area-nav">
        <li v-for="pageObj in PageList" @click="HandlePage(pageObj)"><a :class="{ active: pageObj.isActive }">{{
          pageObj.page }}</a></li>
      </ul>
    </div>
    <AllLines v-show="NowPage === 'All'" :chapter="inputChapter" :LawLists="lawlist" :UlLists="chapterlist" />
    <Chapter v-show="NowPage === 'Chapter'" :chapter="inputChapter" :ChapterOption="chapterOption" />
    <Text v-show="NowPage === 'Text'" :LawLists="lawlist" />
  </div>
</template>

<style scoped>
/* 讓表單內容更居中美觀 */
#law-search-area-form {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* 表單項目之間的間距 */
}


#law-search-area-form input,
#law-search-area-form textarea {
  margin: 10px 0px;
  padding: 10px 10px;
  border: none;
  font-size: 20px;
  border-radius: 5px;
}


@media only screen and (max-width: 786px) {

  #law-search-area-form input,
  #law-search-area-form textarea,
  #law-search-area-form button {
    font-size: 15px;
  }

}

#law-show-area-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* 表單項目之間的間距 */
}

#law-show-area-form input,
#law-show-area-form textarea {
  margin: 10px 0px;
  padding: 5px 10px;
  border: none;
  font-size: 20px;
  border-radius: 5px;
}

/* 確保父容器全屏並設置 Flexbox */
#law-search-area {
  /* 區域高度設為全屏 */
  width: 100vw;
  /* 區域寬度設為全屏 */
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.law-search-area-result {
  width: 90%;
}

.law-search-area-form-send {
  background-color: black;
  color: white !important;
  font-size: 30px;
}

.law-search-area-form-send:after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 70px;
  height: 5px;
  background-color: darkorange;
}

#law-search-area-form input {
  flex: 0 0 55%;
}


#search-area {
  display: flex;
  justify-content: flex-start;
  /* 水平居中 */
  flex-direction: column;
  gap: 20px;
}

#law-search-area-form button {
  background-color: black;
  border: 1px solid white;
  color: white;
  border-radius: 15px;
  padding: 8px 15px;
}

#law-search-area-form button:hover {
  background-color: white;
  color: black;
}

.law-search-area-nav {
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  list-style: none;
  align-items: center;
  gap: 30px;
  padding-left: 0;
}


@media only screen and (max-width: 786px) {

  #law-show-area-form input,
  #law-show-area-form textarea,
  #law-show-area-form button {
    font-size: 15px;
  }

  .law-search-area-form-send {
    font-size: 20px !important;
  }

}
</style>

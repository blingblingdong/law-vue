<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AllLines from "./LawPageCon/AllLines.vue"
import Text from "./LawPageCon/Text.vue"
import Chapter from "./LawPageCon/Chapter.vue"
import Num from "./LawPageCon/Num.vue"
import type { Law, LawList, ChapterUl } from '../types/Law.ts'
import { get_all_lawList, getChapterList, load_chapter_datalist } from '../types/Law.ts'

import { getApiUrl } from '../utils/api.ts'
const ApiLink = getApiUrl();
const NowPage = ref('All');

const chapterlist = ref<null | ChapterUl[]>(null);
const chapterOption = ref<null | string>("");
const data = ref<null | LawList[]>(null);

const props = defineProps<{
  chapter: string;
}>();

onMounted(async () => {
  data.value = await get_all_lawList(props.chapter, ApiLink);
  chapterlist.value = await getChapterList(props.chapter, ApiLink);
  chapterOption.value = await load_chapter_datalist(props.chapter, ApiLink);
});

const HandlePage = function (page: string) {
  NowPage.value = page;
}


const pagelist = ["All", "Chapter", "Text", "Num"]




</script>

<template>
  <div id="test-area">
    <ul class="law-search-area-nav">
      <li v-for="page in pagelist" @click="HandlePage(page)">
        <a :class="{ active: NowPage === page }">{{ page }}</a>
      </li>
    </ul>
    <AllLines v-show="NowPage === 'All'" :chapter="chapter" :LawLists="data" :UlLists="chapterlist" />
    <Chapter v-show="NowPage === 'Chapter'" :chapter="chapter" :ChapterOption="chapterOption" :ullist="chapterlist" />
    <Text v-show="NowPage === 'Text'" :LawLists="data" />
    <Num v-show="NowPage === 'Num'" :chpater="chapter" />
  </div>
</template>

<style scoped>
/* 讓表單內容更居中美觀 */
/* 確保父容器全屏並設置 Flexbox */
#law-search-area {
  /* 區域高度設為全屏 */
  width: 100vw;
  /* 區域寬度設為全屏 */
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

#test-area {}
</style>

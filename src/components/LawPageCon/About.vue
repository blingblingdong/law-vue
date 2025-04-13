<script setup lang="ts">
import { ref, computed } from 'vue'
import { type Law, loadLaw, useProcessedLines } from '../../types/Law.ts'

const ApiLink = "http://localhost:8080"
const lines = ref<string[]>([])
const lines_show = ref(false)

interface PageListType {
  page: string;
  isActive: boolean;
}

const NowPage = ref('All');
const PageList = ref<PageListType[]>([
  { page: "All", isActive: true }, { page: "Chapter", isActive: false }, { page: "Text", isActive: false }, { page: "About", isActive: false }
]);

const HandlePage = function (pageObj: PageListType) {
  PageList.value.forEach(item => {
    item.isActive = (item.page === pageObj.page);
  });
  NowPage.value = pageObj.page;
}


const { processedLines } = useProcessedLines(lines);
</script>

<template>


  <div id="test-area">
    <div id="law-search-area">
      <form id="law-search-area-form">
        <input list="law-name-data" id="search-chapter">
        <button type="submit">查尋</button>
        <button type="reset" id="reset">清除</button>
      </form>
      <ul class="law-search-area-nav">
        <li v-for="pageObj in PageList" @click="HandlePage(pageObj)"><a
            :class="{ active: pageObj.isActive }">{{ pageObj.page }}</a></li>
      </ul>
      <AllLines v-if="NowPage === 'All'" />
      <Chapter v-else-if="NowPage === 'Chapter'" />
      <Text v-else-if="NowPage === 'Text'" />
      <About v-else-if="NowPage === 'About'" />
    </div>
  </div>
</template>

<style scoped></style>

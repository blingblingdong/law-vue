<script setup lang="ts">
import { ref } from 'vue'
import { type Law, type LawList, get_chapter_lawList } from '../../types/Law.ts'
import { getApiUrl } from '../../utils/api'

const ApiLink = getApiUrl();
const props = defineProps<{
  chapter: string;
  ChapterOption: string | null;
}>();

const LawLists = ref<null | Law[]>(null)

const searchChapter = ref('');
const search = async () => {
  const list = await get_chapter_lawList(props.chapter, searchChapter.value, ApiLink);
  if (list != null) {
    LawLists.value = list;
  } else {
    LawLists.value = null;
  }

};









</script>

<template>
  <div id="chapter-area">
    <form id="chapter-form">
      <input list="chapter-name-data" id="chapter-name" @input="search" v-model="searchChapter">
      <datalist id="chapter-name-data" v-html="ChapterOption"></datalist>
      <button type="submit">查詢</button>
      <button id="show-chapter">章節</button>
    </form>
    <div id="chapter-ul" style="display: none"></div>
    <div v-if="LawLists">
      <div class="law-card" v-for="law in LawLists">
        <div class="law-card-title">
          <p>第{{ law.num }}條</p>
        </div>
        <ul class='law-block-lines'>
          <template v-for="line in law.lines">
            <div v-if="line.line_type === 'indent'" class="law-indent">{{ line.content }}</div>
            <div v-else class="law-block-line line-0000 show-number">{{ line.content }}</div>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chpaterAreaC {
  font-size: 18px;
  font-weight: 500;
  margin: 5px 10px;
}



#chapter-form {
  display: flex;
  text-align: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

#chapter-form input {
  flex: 70%;
  padding: 10px;
}

#chapter-area {
  align-items: center;
  margin: 10px;
  display: block;
  flex: 10%;
}

#chapter-form button {
  border-radius: 4px;
  border: none;
}

#chapter-form button:hover {
  background-color: #443DFF;
  ;
}
</style>

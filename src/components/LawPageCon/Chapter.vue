<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Law, LawList } from '../../types/Law.ts'
import { getApiUrl } from '../../utils/api.ts'

const ApiLink = getApiUrl();
const props = defineProps<{
  chapter: string;
  ChapterOption: string | null;
}>();

const LawLists = ref<null | LawList[]>(null)

const searchChapter = ref('');
const search = async () => {
  const list = await get_chapter_lawList(props.chapter, searchChapter.value);
  if (list != null) {
    LawLists.value = list;
  }

};

async function get_chapter_lawList(chapter1: string, chapter2: string): Promise<LawList[] | null> {
  const chapterData = { chapter1: chapter1, chapter2: chapter2 };
  const res = await fetch(`${ApiLink}/lawList_by_chapter"`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chapterData),
  })
  const data = await res.json();
  return data as LawList[];
}







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
    <div v-for="LawListObj in LawLists">
      <div v-for="c in LawListObj.chapter" class='chpaterAreaC'>{{ c }}</div>
      <div class="law-card" v-for="law in LawListObj.laws">
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

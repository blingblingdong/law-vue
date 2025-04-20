<script setup lang="ts">
import { onMounted, ref, watch, onUnmounted } from 'vue'
import type { Law, LawList, ChapterUl, Line } from '../../types/Law.ts'
import PrintChapter from '././PrintChapter.vue'
import { to_history_link } from '../../types/Law'



const props = defineProps<{
  chapter: string;
  LawLists: LawList[] | null;
  UlLists: ChapterUl[] | null;
}>();



const num = ref('');
const searchChapter = ref('');
const text = ref('');


const lawlines = function (lines: Line[]) {
  let buffer = "";
  lines.forEach(line => {
    let content_buffer = "";
    if (line.content.includes(text.value)) {
      content_buffer = line.content.replace(text.value, `<span class="highlight">${text.value}</span>`)
    } else {
      content_buffer = line.content;
    }
    if (line.line_type === 'indent') {
      buffer = buffer + `<div class=law-indent>${content_buffer}</div>`
    } else {
      buffer = buffer + `<li class="law-line">${content_buffer}</li>`
    }

  })
  return buffer
}





const IsSearching = function (lawnumber: string) {
  if (num.value === "") {
    return true
  }
  if (num.value === lawnumber) {
    return true
  }
  return false
}


const IsSearchingText = function (lines: Line[]) {
  let bool: boolean = false;
  if (text.value === "") {
    bool = true;
  }
  lines.forEach(s => {
    if (s.content.includes(text.value)) {
      bool = true
    }
  })
  return bool
}

const showchapter = (l: Law) => {
  alert(l.href)
}



// 假設 entertext 與 bar 都是 data 中的變數
</script>

<template>
  <div id="all-lines-area" v-if="LawLists && LawLists.length > 0">
    <div id="all-lines">
      <div v-for="LawListObj in LawLists">
        <div :id="c" v-for="c in LawListObj.chapter" class="alllineschapter"
          :class="{ searchingChapter: c === searchChapter }" v-show="text === '' && num === ''">{{ c }}</div>
        <div class="law-card" v-for="law in LawListObj.laws" :id="chapter + law.num"
          v-show="IsSearching(law.num) && IsSearchingText(law.lines)">
          <div class="law-card-title">
            <p :class="{ searchingNum: law.num === num }">第{{ law.num }}條</p>
            <p v-show="text !== '' || num !== ''" @click="showchapter(law)">from{{ law.chapter.join(" > ") }}</p>
            <div class="lawToolBar">
              <a :href="to_history_link(chapter, law.num)">history link</a>
              <a :href="'https://law.moj.gov.tw/LawClass/' + law.href">source link</a>
            </div>
          </div>
          <div class='law-block-lines'>
            <template v-for="line in law.lines" v-if="text === ''">
              <div v-if="line.line_type === 'indent'" class="law-indent">{{ line.content }}</div>
              <div v-else class="law-block-line">{{ line.content }}</div>
            </template>
            <template v-else>
              <div v-html="lawlines(law.lines)"></div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div id="all-chapter">
      <div id="realchapter">
        <PrintChapter v-if="UlLists" :ullist="UlLists" :chapter="chapter" />
        <div id="searchbar">
          search by chapter
          <div id="searchbar-num">
            <input v-model="searchChapter"></input><a :href="'#' + searchChapter">go</a>
          </div>
          search by num
          <div id="searchbar-chapter">
            <input v-model="num"></input>
          </div>
          search by text
          <div id="searchbar-text">
            <input v-model="text"></input>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.law-block-line::before {
  counter-increment: num;
  content: counter(num);
  margin-right: 0.5rem;
  margin-left: -1em;
  text-align: right;
  color: white;
}

.law-block-line {
  margin-left: 1em;
  text-indent: -0em;
  position: relative;
}

.law-indent {
  margin-left: 3em;
  text-indent: -2em;
}

.law-block-lines {
  counter-reset: num;
}

input {
  background-color: var(--gray-color);
  padding: 5px;
  border-radius: 5px;
}




#all-lines-area {
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 5px;
}

#all-lines {
  flex: 60%;
}

#all-chapter {
  flex: 30%;
  top: 20%;
}

#realchapter {
  top: 10%;
  position: sticky;
}


.alllineschapter {
  margin: 10px 0px;
  font-weight: 700;
  font-size: 1.2rem;
}

#realchpater {
  top: 20%;
  position: sticky;
}

#searchbar-chapter,
#searchbar-num {
  gap: 10px;
  display: flex;
}

#searchbar {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.searchingNum {
  color: darkorange;
}

.searchingChapter {
  color: darkorange;
}

a {
  text-decoration: none;
  color: white;
}

.lawToolBar {
  display: flex;
  gap: 10px;
}

.lawToolBar a:hover {
  color: var(--primary-color);
}
</style>

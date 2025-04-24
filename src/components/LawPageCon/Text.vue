<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Law, LawList, Line } from '../../types/Law.ts'


const props = defineProps<{
  LawLists: LawList[] | null;
}>();

const text = ref('');
const IsSearchingText = function (lines: Line[]) {
  let bool = false;
  lines.forEach(line => {
    if (line.content.includes(text.value)) {
      bool = true;
    }
  })
  return bool;
}

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


</script>

<template v-if="LawList">
  <div id="searchTextArea">
    <input v-model="text" id="searchTextInput"></input>
    <div v-for="LawListObj in LawLists" id="lawlist">
      <div class="law-card" v-for="law in LawListObj.laws" :id="law.chapter[0] + law.num"
        v-show="IsSearchingText(law.lines) && text !== ''">
        <div class="law-card-title">
          <p>第{{ law.num }}條</p>
          <p v-show="text !== ''">from：{{ law.chapter.join(" > ") }}</p>
        </div>
        <ul class='law-block-lines'>
          <div v-html="lawlines(law.lines)"></div>
        </ul>
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
  color: var(--text-color);
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



#searchTextInput {
  width: 50%;
  padding: 10px 20px;
  align-self: center;
}

#searchTextArea {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
}
</style>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { loadLaw, type Law, type LawList, type Line, to_history_link } from '../../types/Law.ts'


const props = defineProps<{
  chpater: string;
}>();
const num = ref("")
const thelaw = ref<Law | null>(null);
import { getApiUrl } from '../../utils/api.ts'
const ApiLink = getApiUrl();


watch(
  () => num.value,
  async (number) => {
    thelaw.value = await loadLaw(props.chpater, number, ApiLink);
  }
)


</script>

<template v-if="LawList">
  <div id="searchTextArea">
    <p style="align-self:center;">輸入條號</p>

    <input v-model="num" id="searchTextInput"></input>
    <div class="law-card" v-if="thelaw">
      <div class="law-card-title">
        <p>第{{ thelaw.num }}條</p>
        <p>
          from{{ thelaw.chapter.join(" > ") }}</p>
        <div class="lawToolBar">
          <a :href="to_history_link(thelaw.chapter[0], thelaw.num)">history link</a>
          <a :href="'https://law.moj.gov.tw/LawClass/' + thelaw.href">source link</a>
        </div>
      </div>
      <div class='law-block-lines'>
        <template v-for="line in thelaw.lines">
          <div v-if="line.line_type === 'indent'" class="law-indent">{{ line.content }}</div>
          <div v-else class="law-block-line">{{ line.content }}</div>
        </template>
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

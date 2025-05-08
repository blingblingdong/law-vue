<template>
  <div class="law-block" v-if="card">
    <div class="law-block-content-multiple">
      <p class="law-block-chapter-num">
        <span class="law-block-chapter" @click="ui.goToLawPage(card.chapter)">{{ card.chapter }}</span>
        第
        <span class="law-block-num">{{ card.num }}</span>
        條
      </p>
      <div class="tool-bar">
        <i class="fa-solid fa-eye" v-show="!showLines" @click="showLines = true"></i>
        <i class="fa-solid fa-eye-slash" v-show="showLines" @click="showLines = false"></i>
        <i class="fa-solid fa-clock-rotate-left" @click="clickhistorylaw"></i>
      </div>
      <div class='law-block-lines' v-show="showLines">
        <template v-for="line in card.lines">
          <div v-if="line.line_type === 'indent'" :class="line.attributes?.class" :style="line.attributes?.style">
            <template v-if="line.children" v-for="child in line.children">
              <InlineNodeTemplate :inline-node="child as InlineNode" />
            </template>
          </div>
          <div v-else class="law-block-line" :class="line.attributes?.class" :style="line.attributes?.style">
            <template v-if="line.children" v-for="child in line.children">
              <InlineNodeTemplate :inline-node="child as InlineNode" />
            </template>
          </div>
        </template>
      </div>
      <div class="lawnote" v-if="false">
        <div class="lawnote-title">筆記開頭</div>
        <div class="lawnote-content" v-html="lawnotecontent" v-if="false">
        </div>
      </div>
      <div class="historylaw" v-if="showhistorylaw">
        <template v-if="historylawvec">
          <p>歷史法規</p>
          <div v-for="historylaw in historylawvec" class="historycontent">
            <div>{{ historylaw.date }}</div>
            <pre>{{ historylaw.content }}</pre>
          </div>
        </template>
        <template v-else>
          目前沒有歷史法規...
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue'
import type { Attributes, InlineNode, Block, Note, Line, LawCard } from '../../types/Note'
import InlineNodeTemplate from './InlineNodeTemplate.vue'
import { to_history_link, type HistoryLaw, getHistoryLaw } from '../../types/Law.ts'
import { useUiStore } from '../../store/page.ts'
const ui = useUiStore();
import { getApiUrl } from '../../utils/api.ts'
import swal from 'sweetalert'

const ApiLink = getApiUrl();

const lawnotecontent = ref("<p>ggh</p>")

const historylawvec = ref<HistoryLaw[]>([]);
const showhistorylaw = ref(false);



const clickhistorylaw = async () => {
  showhistorylaw.value ? showhistorylaw.value = false : showhistorylaw.value = true;
  if (showhistorylaw.value) {
    const id = `${props.block.data?.chapter}-${props.block.data?.num}`
    const res = await getHistoryLaw(ApiLink, id);
    if (res && res.length != 0) {
      historylawvec.value = res;
    } else {
      swal("抱歉，網頁還未寫入本法的歷史紀錄");
      showhistorylaw.value = false;
    }
  }
}



const showLines = ref(true);
const card = ref<LawCard>();

const props = defineProps<{
  block: Block
}>()


if (props.block.data) {
  card.value = props.block.data;
}


</script>

<style scoped>
.controlshowlaw {
  position: relative;
  left: 73%;
}

.lawnote {
  border-top: 1px solid white;
  margin-top: 10px;
}

.tool-bar {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.tool-bar p {
  color: var(--text-color);
  margin: 0px;
  border: none;
  background-color: var(--gray-color);
}

.tool-bar button:hover {
  color: var(--primary-color);
}


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




.law-block {
  color: var(--text-color);
  border-left: 4px solid var(--accent-color);
  margin: 10px;
  background-color: var(--gray-color);
  border-radius: 10px;
  padding: 5px 5px;
}

.multiple-block {
  color: var(--text-color);
  border: 1px solid var(--text-color);
  margin: 10px;
}

.law-block-chapter-num {
  display: flex;
  align-items: center;
}


.law-block-content-multiple {
  border-bottom: 0px solid var(--text-color);
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 5px;
}

.law-block-chapter {
  font-weight: bold;
}

.law-block-chapter:hover {
  cursor: pointer;
  color: var(--primary-color);
}

.historycontent {
  margin-top: 10px;
}

.law-block-lines {
  list-style-type: none;
}

pre {
  all: unset;
  white-space: pre-wrap;
}
</style>

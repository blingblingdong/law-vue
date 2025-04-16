<template>
  <div id="newinterpretation_area">
    <h2 class="no">釋字{{ datax.id }}</h2>
    <div class="row date">{{ datax.date }}</div>
    <div class="row trouble">{{ datax.trouble }}</div>
    <pre class="row reason">{{ datax.reasoning.trim() }}</pre>
    <div class="row content" v-html="rawContent"></div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue'
import type { Attributes, InlineNode, Block, Note } from '../../types/Note'


const props = defineProps<{
  datax: any
}>()

const newinterpretationdata = ref();
const rawContent = ref("")

onMounted(() => {
  // newinterpretationdata.value = props.data as newinterpretation;
  if (props.datax.content) {
    rawContent.value = convertToHTML(props.datax.content);
  }
})

function convertToHTML(text: string): string {
  return text
    .split(/\n{2,}/)  // 兩個以上換行視為一個段落
    .map(p => `<p>${p.replace(/\n/g, '')}</p>`)  // 保留段落內的換行
    .join('');
}


</script>

<style scoped>
#newinterpretation_area {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content {
  font-size: 18px;
  margin: 20px;
  line-height: 25px;
}

.reason {
  font-size: 15px;
}
</style>

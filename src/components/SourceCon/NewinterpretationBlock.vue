<template>
  <h2 class="no">{{ datax.no }}</h2>
  <div class="row name">{{ datax.name }}</div>
  <div class="row date">{{ datax.date }}</div>
  <pre class="row reason">{{ datax.reason }}</pre>
  <pre class="row content">{{ datax.content }}</pre>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue'
import type { Attributes, InlineNode, Block, Note } from '../../types/Note'


const props = defineProps<{
  datax: any
}>()

const newinterpretationdata = ref();

onMounted(() => {
  newinterpretationdata.value = props.datax as newinterpretation;
})




interface newinterpretation {
  id: string,
  no?: string,
  name: string,
  date: string,
  reason?: string,
  content?: string,
  related_law?: string,
  source?: string,
  year: number,
  number: number,
}
</script>

<style scoped>
#newinterpretation_area {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content {
  font-size: 15px;
}

.reason {
  font-size: 15px;
}
</style>

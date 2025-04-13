<template>
  <div id="newinterpretation_area">
    <h2 class="no">釋字{{ datax.id }}</h2>
    <div class="row date">{{ datax.date }}</div>
    <div class="row trouble">{{ datax.troble }}</div>
    <pre class="row reason">{{ datax.reasoning.trim() }}</pre>
    <pre class="row content">{{ datax.content }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue'
import type { Attributes, InlineNode, Block, Note } from '../../types/Note'


const props = defineProps<{
  datax: any
}>()

const newinterpretationdata = ref();

onMounted(() => {
  // newinterpretationdata.value = props.data as newinterpretation;
})


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

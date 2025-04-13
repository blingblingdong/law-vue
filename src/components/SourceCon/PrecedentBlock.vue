<template>
  <div id="newinterpretation_area">
    <h2 class="no">{{ datax.name }}</h2>
    <pre class="row content">{{ datax.holding }}</pre>
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

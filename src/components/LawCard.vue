<template>
  <div class="law-card-title">
    <p>{{ law.chapter[0] }}第{{ law.num }}條</p>
    <i class="fa-solid fa-eye" v-show="!showLines" @click="showLines = true"></i>
    <i class="fa-solid fa-eye-slash" v-show="showLines" @click="showLines = false"></i>
  </div>
  <div class='law-block-lines' v-show="showLines">
    <template v-for="line in law.lines">
      <div v-if="line.line_type === 'indent'" class="law-indent">{{ line.content }}</div>
      <div v-else class="law-block-line">{{ line.content }}</div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue'
import { type Law } from '../types/Law'



const showLines = ref(false);

const props = defineProps<{
  law: Law;
}>()




</script>

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

.law-card-title {
  display: flex;
  gap: 10px;
  align-items: center;
}

p {
  margin: 5px;
}
</style>

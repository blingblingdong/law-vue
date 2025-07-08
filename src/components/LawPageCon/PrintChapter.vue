<script lang="ts" setup>
import { defineProps, computed, onMounted, ref, nextTick, onUnmounted } from 'vue'
import type { ChapterUl } from '../../types/Law.ts'
const ApiLink = "http://localhost:8080"


const props = defineProps<{
  ullist: ChapterUl[];
  chapter: string;
}>();

const enterul = ref('');
const enterli = ref('');
const enterli2 = ref('');
const enterli3 = ref('');
const enterli4 = ref('');


</script>


<template>
  <div>Chapter</div>
  <ul v-if="ullist" v-for="ul in ullist" class="lawChapter1" @mouseenter="enterul = ul.chapter"
    @mouseleave="enterul = ''">
    <a :href="'#' + ul.chapter">{{ ul.chapter }}</a>
    <li v-if="ul.childChapters" v-for="li in ul.childChapters" class="lawChapter2" @mouseenter="enterli = li.chapter"
      @mouseleave="enterli = ''" v-show="enterul === ul.chapter">
      <a :href="'#' + li.chapter">{{ li.chapter }}</a>
    <li v-if="li.childChapters" v-for="li2 in li.childChapters" class="lawChapter3" @mouseenter="enterli2 = li2.chapter"
      @mouseleave="enterli2 = ''" v-show="enterli === li.chapter">
      <a :href="'#' + li2.chapter">{{ li2.chapter }}</a>
    <li v-if="li2.childChapters" v-for="li3 in li2.childChapters" class="lawChapter4"
      @mouseenter="enterli3 = li3.chapter" @mouseleave="enterli3 = ''" v-show="enterli2 === li2.chapter">
      <a :href="'#' + li3.chapter">{{ li3.chapter }}</a>
    <li v-if="li3.childChapters" v-for="li4 in li3.childChapters" class="lawChapter5"
      @mouseenter="enterli4 = li4.chapter" @mouseleave="enterli4 = ''" v-show="enterli3 === li3.chapter">
      <a :href="'#' + li4.chapter">{{ li4.chapter }}</a>
    </li>
    </li>
    </li>
    </li>
  </ul>
</template>


<style scoped>
.lawChapter1 {
  overflow-y: scroll;
}



a {
  color: var(--text-color);
  text-decoration: none;
}

li {
  list-style: none;
  padding-left: 10px;
  border-left: 1px solid var(--gray-color);
}

ul {
  border-left: 1px solid var(--gray-color);
  padding-left: 5px;
  margin: 0px;
  padding-top: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

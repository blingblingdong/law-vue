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
const clickNav = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}



</script>


<template>
  <div>Chapter</div>
  <ul v-if="ullist" v-for="ul in ullist" class="lawChapter1" @click="enterul = ul.chapter">
    <a @click.prevent="clickNav(ul.chapter)" :class="{ colornav: ul.chapter === enterul }">{{ ul.chapter }}</a>
    <li v-if="ul.childChapters" v-for="li in ul.childChapters" class="lawChapter2" @click="enterli = li.chapter"
      v-show="enterul === ul.chapter">
      <a @click.prevent="clickNav(li.chapter)" :class="{ colornav: li.chapter === enterli }">{{ li.chapter }}</a>
    <li v-if="li.childChapters" v-for="li2 in li.childChapters" class="lawChapter3" @click="enterli2 = li2.chapter"
      v-show="enterli === li.chapter">
      <a @click="clickNav(li2.chapter)" :class="{ colornav: li2.chapter === enterli2 }">{{ li2.chapter }}</a>
    <li v-if="li2.childChapters" v-for="li3 in li2.childChapters" class="lawChapter4" @click="enterli3 = li3.chapter"
      v-show="enterli2 === li2.chapter">
      <a @click.prevent="clickNav(li3.chapter)" :class="{ colornav: li3.chapter === enterli3 }">{{ li3.chapter }}</a>
    <li v-if="li3.childChapters" v-for="li4 in li3.childChapters" class="lawChapter5" @click="enterli4 = li4.chapter"
      v-show="enterli3 === li3.chapter">
      <a @click.prevent="clickNav(li4.chapter)" :class="{ colornav: li4.chapter === enterli4 }">{{ li4.chapter }}</a>
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

a:hover {
  cursor: pointer;
  color: var(--primary-color);
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

.colornav {
  color: var(--primary-color);
}
</style>

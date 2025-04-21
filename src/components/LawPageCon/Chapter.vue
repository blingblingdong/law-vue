<script setup lang="ts">
import { ref } from 'vue'
import { type Law, type LawList, get_chapter_lawList, type ChapterUl } from '../../types/Law.ts'
import { getApiUrl } from '../../utils/api'
import LawCard from '../LawCard.vue'

const ApiLink = getApiUrl();
const props = defineProps<{
  chapter: string;
  ChapterOption: string | null;
  ullist: ChapterUl[] | null;
}>();

const LawLists = ref<null | Law[]>(null)

const searchChapter = ref('');
const search = async () => {
  let chapter2 = searchChapter.value.replace(/\s+/g, "")
  const list = await get_chapter_lawList(props.chapter, searchChapter.value, ApiLink);
  if (list != null) {
    LawLists.value = list;
  } else {
    LawLists.value = null;
  }

};


const enterul = ref('');
const enterli = ref('');
const enterli2 = ref('');
const enterli3 = ref('');
const enterli4 = ref('');

const showchapter = async (name: string) => {
  const chapter2 = name.replace(/\s+/g, "");
  LawLists.value = await get_chapter_lawList(props.chapter, chapter2, ApiLink);
  enterul.value = name;
  showlawlist.value = true;
}

const showlawlist = ref(true);


</script>

<template>
  <div id="chapter-area">
    <form id="chapter-form">
      <input list="chapter-name-data" id="chapter-name" @input="search" v-model="searchChapter">
      <datalist id="chapter-name-data" v-html="ChapterOption"></datalist>
      <button type="submit">查詢</button>
      <button id="show-chapter">章節</button>
    </form>
    <div>
      <div>Chapter</div>
      <ul v-if="ullist" v-for="ul in ullist">
        <div class="lititle">
          <p @click=showchapter(ul.chapter)>{{ ul.chapter }}</p>
          <div v-show="enterul === ul.chapter">
            <i class="fa-solid fa-chevron-up" v-show="showlawlist" @click="showlawlist = false"></i>
            <i class="fa-solid fa-chevron-down" v-show="!showlawlist" @click="showlawlist = true"></i>
          </div>
        </div>
        <div v-if="enterul === ul.chapter">
          <div v-if="LawLists" v-show="showlawlist">
            <div class="law-card" v-for="law in LawLists">
              <LawCard :law="law" />
            </div>
          </div>
        </div>
        <li v-if="ul.childChapters" v-for="li in ul.childChapters" class="lawChapter2">
          <div class="lititle">
            <p @click=showchapter(li.chapter)>{{ li.chapter }}</p>
            <div v-show="enterul === li.chapter">
              <i class="fa-solid fa-chevron-up" v-show="showlawlist" @click="showlawlist = false"></i>
              <i class="fa-solid fa-chevron-down" v-show="!showlawlist" @click="showlawlist = true"></i>
            </div>
          </div>
          <div v-if="enterul === li.chapter">
            <div v-if="LawLists" v-show="showlawlist">
              <div class="law-card" v-for="law in LawLists">
                <LawCard :law="law" />
              </div>
            </div>
          </div>
        <li v-if="li.childChapters" v-for="li2 in li.childChapters" class="lawChapter3">
          <div class="lititle">
            <p @click=showchapter(li2.chapter)>{{ li2.chapter }}</p>
            <div v-show="enterul === li2.chapter">
              <i class="fa-solid fa-chevron-up" v-show="showlawlist" @click="showlawlist = false"></i>
              <i class="fa-solid fa-chevron-down" v-show="!showlawlist" @click="showlawlist = true"></i>
            </div>
          </div>
          <div v-if="enterul === li2.chapter">
            <div v-if="LawLists" v-show="showlawlist">
              <div class="law-card" v-for="law in LawLists">
                <LawCard :law="law" />
              </div>
            </div>
          </div>
        <li v-if="li2.childChapters" v-for="li3 in li2.childChapters" class="lawChapter4">
          <div class="lititle">
            <p @click=showchapter(li3.chapter)>{{ li3.chapter }}</p>
            <div v-show="enterul === li3.chapter">
              <i class="fa-solid fa-chevron-up" v-show="showlawlist" @click="showlawlist = false"></i>
              <i class="fa-solid fa-chevron-down" v-show="!showlawlist" @click="showlawlist = true"></i>
            </div>

          </div>
          <div v-if="enterul === li3.chapter">
            <div v-if="LawLists" v-show="showlawlist">
              <div class="law-card" v-for="law in LawLists">
                <LawCard :law="law" />
              </div>
            </div>
          </div>
        <li v-if="li3.childChapters" v-for="li4 in li3.childChapters" class="lawChapter5">
          <div class="lititle">
            <p @click=showchapter(li4.chapter)>{{ li4.chapter }}</p>
            <div v-show="enterul === li4.chapter">
              <i class="fa-solid fa-chevron-up" v-show="showlawlist" @click="showlawlist = false"></i>
              <i class="fa-solid fa-chevron-down" v-show="!showlawlist" @click="showlawlist = true"></i>
            </div>
          </div>
          <div v-if="enterul === li4.chapter">
            <div v-if="LawLists" v-show="showlawlist">
              <div class="law-card" v-for="law in LawLists">
                <LawCard :law="law" />
              </div>
            </div>
          </div>
        </li>
        </li>
        </li>
        </li>
      </ul>

    </div>
    <div v-if="LawLists">
      <div class="law-card" v-for="law in LawLists">
        <div class="law-card-title">
          <p>第{{ law.num }}條</p>
        </div>
        <ul class='law-block-lines'>
          <template v-for="line in law.lines">
            <div v-if="line.line_type === 'indent'" class="law-indent">{{ line.content }}</div>
            <div v-else class="law-block-line line-0000 show-number">{{ line.content }}</div>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chpaterAreaC {
  font-size: 18px;
  font-weight: 500;
  margin: 5px 10px;
}



#chapter-form {
  display: flex;
  text-align: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

#chapter-form input {
  flex: 70%;
  padding: 10px;
}

#chapter-area {
  align-items: center;
  margin: 10px;
  display: block;
  flex: 10%;
}

#chapter-form button {
  border-radius: 4px;
  border: none;
}

#chapter-form button:hover {
  background-color: #443DFF;
  ;
}

a {
  color: white;
  text-decoration: none;
  font-size: 20px;
}

li {
  list-style: none;
  padding-left: 40px;
  border-left: 1px solid var(--gray-color);
}

ul {
  border-left: 1px solid var(--gray-color);
  padding-left: 5px;
  margin: 0px;
  padding-top: 20px;
}

.lititle {
  display: flex;
  gap: 10px;
  align-items: center;
}

.lititle p:hover {
  color: darkorange;
  cursor: pointer;
}


.lititle p {
  margin: 0px;
}
</style>

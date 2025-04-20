<template>
  <div id="newinterpretation_area">
    <div>
      <div id="fakePage" v-show="searchText !== ''">
        <div v-html="fakePageHtml"></div>
      </div>
      <div ref="realpage" v-show="searchText === ''">
        <h2 class="no">釋字{{ datax.id }}</h2>
        <div class="row">
          <h3 class="title" id="Date">Date</h3>
          <div class="content">{{ datax.date }}</div>
        </div>
        <div class="row" v-if="datax.reflaws">
          <h3 class="title" id="RefLaws">Related Law</h3>
          <div class="content" v-if="lawvec">
            <div class="law-card" v-for="law in lawvec">
              <LawCard :law="law" />
            </div>
          </div>
        </div>
        <div class="row" v-if="datax.trouble">
          <h3 class="title" id="Trouble">Trouble Shooting</h3>
          <div class="content">{{ datax.trouble }}</div>
        </div>
        <div class="row" v-if="datax.reasoning">
          <h3 class="title" id="Reason">Reason</h3>
          <div class="content">{{ datax.reasoning }}</div>
        </div>
        <div class="row">
          <h3 class="title" id="Content">Content</h3>
          <div class="content" v-html="rawContent"></div>
        </div>
      </div>
    </div>
    <div>
      <div id="toolarea">
        <ul id="chapterlist">
          釋字{{ datax.id }}
          <li v-for="chapter in chaptervec"><a :href="'#' + chapter">{{ chapter }}</a></li>
        </ul>
        <ul v-if="datax.reflaws" id="lawnamevec">
          <span>Law Link：</span>
          <li v-for="lawname in datax.reflaws">{{ lawname }}</li>
        </ul>
        <ul v-if="datax.refinter" id="intervec">
          <span>Interpretation Link：</span>
          <li v-for="intername in intervec2">釋字{{ intername }}</li>
        </ul>
        <p>search by text</p>
        <input @input="searching" v-model="TheSearchingText"></input>
        <p v-if="searchText !== ''">find {{ count }} element</p>
        <p v-if="searchText !== ''" id="searchbytextbtn">
          <a @click.prevent="handleClick" id="nextbtn">next</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted, nextTick, watch } from 'vue'
import type { Attributes, InlineNode, Block, Note } from '../../types/Note'
import { type Law, loadLaw } from '../../types/Law'
import LawCard from '../LawCard.vue'
import { getApiUrl } from '../../utils/api'
const ApiLink = getApiUrl();



const chaptervec = ["Date", "Trouble", "Reason", "Content"];
const searchText = ref("");
const realpage = ref<HTMLElement | null>(null)
const count = ref(0);
const goCount = ref(0);
const html = ref('');
const TheSearchingText = ref('');

const searching = () => {
  searchText.value = TheSearchingText.value;
  count.value = 0;
  fakePageHtml.value = returnfake();
}

const handleClick = () => {
  if (goCount.value === count.value) {
    goCount.value = 0;
  } else {
    goCount.value += 1;
  }
  // 更新完成後手動設定 hash（或依需求處理）
  nextTick(() => {
    const element = document.getElementById(`FindingText-${goCount.value}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
};

const fakePageHtml = ref("");

function returnfake() {
  html.value = (realpage.value?.innerHTML || "") as string;
  let x = html.value.includes(searchText.value);
  if (!x) {
    return "找不到" + searchText.value
  } else {
    count.value = 0;
    let buffer = html.value.replace(new RegExp(searchText.value, "g"), () => {
      count.value++;
      return `<span class='highlight' id='FindingText-${count.value}'>${searchText.value}</span>`
    });
    return buffer
  }
}

interface oldinter {
  id: string
  date: string
  source: string
  related_law?: string
  reasoning?: string
  content?: string
  trouble?: string
  reflaws?: string[]
  reflawid?: string[]
  refinter?: string[]

}

const props = defineProps<{
  datax: oldinter;
}>()

const newinterpretationdata = ref();
const rawContent = ref("")
const lawvec = ref<Law[]>([]);
const intervec2 = ref<Number[]>([]);


onMounted(() => {
  // newinterpretationdata.value = props.data as newinterpretation;

  lawvec.value = [];
  intervec2.value = [];

  if (props.datax.content) {
    rawContent.value = convertToHTML(props.datax.content);
  }

  if (props.datax.reflawid) {
    let set = new Set(props.datax.reflawid);
    let array = Array.from(set) as string[];
    array.forEach(async id => {
      const [chapter, num] = id.split("-");
      let law = await loadLaw(chapter, num, ApiLink);
      if (law) {
        lawvec.value.push(law);
      }
    })
  }

  if (props.datax.refinter) {
    let v = props.datax.refinter as string[];
    intervec2.value = v.map(item => parseInt(item)).filter(num => num < 1000).sort();
  }

})

watch(
  () => props.datax,
  (data) => {

    lawvec.value = [];
    intervec2.value = [];


    if (data.content) {
      rawContent.value = convertToHTML(data.content);
    }

    if (data.reflawid) {
      let set = new Set(data.reflawid);
      let array = Array.from(set) as string[];
      array.forEach(async id => {
        const [chapter, num] = id.split("-");
        let law = await loadLaw(chapter, num, ApiLink);
        if (law) {
          lawvec.value.push(law);
        }
      })
    }

    if (data.refinter) {
      let v = data.refinter as string[];
      intervec2.value = v.map(item => parseInt(item)).filter(num => num < 1000).sort();

    }

  },

)

function convertToHTML(text: string): string {
  return text
    .split(/。{1,}\n/) // 兩個以上換行視為一個段落
    .map(p => `<p>${p.replace(/\n/g, '')}</p>`)  // 保留段落內的換行
    .join('');
}


</script>

<style scoped>
#chapterlist {
  list-style: none;
  margin-left: 0px;
  padding: 0px;
}

#chapterlist li {
  margin-left: 5px;
  padding: 0px;
}


#chapterlist li:hover {
  color: var(--primary-color);
}


#toolarea {
  position: sticky;
  top: 10%;
}

.no {
  margin-bottom: 0px;
}


.title:after,
.description:after {
  display: block;
  content: "";
  position: absolute;
  width: 300px;
  height: 0.5px;
  background-color: white;
  /* 設置底線顏色 */
}

.title,
.description {
  font-size: 1.2rem;
  font-weight: 500;
  /* 正確的 font-weight 應該是沒有單位的 */
  line-height: 3rem;
  margin-left: 0px;
  margin-top: 0px;
}

.content {
  margin: 10px 10px;
  font-size: 17px;
  line-height: 25px;
  color: #EAEAEA;
  margin: 10px 10px;
}


#newinterpretation_area {
  display: grid;
  grid-template-columns: 4fr 1fr;
  overflow-wrap: break-word;
  /* 長字換行 */
  word-break: break-word;

}


input {
  padding: 5px 5px;
}

a {
  text-decoration: none;
}

#lawnamevec,
#intervec {
  list-style: none;
  padding: 0px;
  max-height: 200px;
  overflow-y: auto;
}

#lawnamevec li,
#intervec li {
  padding-left: 5px;
}

#lawnamevec li:hover,
#intervec li:hover {
  color: var(--primary-color);
  cursor: pointer;

}

@media only screen and (max-width: 600px) {
  #toolarea {
    display: none;
  }

  #newinterpretation_area {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    margin-right: 30px;
  }

}

@media only screen and (max-width: 500px) {

  .content {
    margin: 10px 10px;
    font-size: 14px;
    line-height: 25px;
    color: #EAEAEA;
    margin: 10px 10px;
  }

  .title,
  .description {
    font-size: 1.1rem;
    font-weight: 500;
    /* 正確的 font-weight 應該是沒有單位的 */
    line-height: 3rem;
    margin-left: 0px;
    margin-top: 0px;
  }



}
</style>

<template>
  <div id="newinterpretation_area">
    <div id="page">
      <div id="fakePage" v-show="searchText !== ''">
        <div v-html="fakePageHtml"></div>
      </div>
      <div ref="realpage" v-show="searchText === ''" id="realpage">
        <h2 class="no" id="name">{{ datax.name }}</h2>
        <h3 class="row casename">{{ datax.casename }}</h3>
        <div class="row">
          <h3 class="title" id="Date">Date</h3>
          <div class="content">{{ datax.date }}</div>
        </div>
        <div class="row">
          <h3 class="title" id="CaseSummary">Case Summary</h3>
          <div class="content" v-if="datax.reason">{{ datax.casesummary }}</div>
        </div>
        <div class="row">
          <h3 class="title" id="Source">Source</h3>
          <div class="content" v-if="datax.source">
            <p>法務部：<a :href="datax.source">連結按此!</a></p>
          </div>
        </div>
        <div class="row">
          <h3 class="title" id="RefLaws">Related Law</h3>
          <div class="content" v-if="datax.reflaws">
            <div class="law-card" v-for="law in lawvec">
              <LawCard :law="law" />
            </div>
          </div>
        </div>
        <div class="row">
          <h3 class="title" id="Content">Content</h3>
          <div class="content" v-html="mainparts" @click="handleclicklaw"></div>
        </div>
        <div class="row">
          <h3 class="title" id="Reason">Reason</h3>
          <div class="content" v-html="reason" @click="handleclicklaw"></div>
        </div>
      </div>
    </div>

    <div>
      <div id="toolarea">
        <ul id="chapterlist">
          {{ datax.name }}

          <li><a href="#Date">Date</a></li>
          <li><a href="#CaseSummary">CaseSummary</a></li>
          <li><a href="#Source">Source</a></li>
          <li><a href="#RefLaws">Related Law</a></li>
          <li><a href="#Content">Content</a></li>
          <li><a href="#Reason">Reason</a></li>
        </ul>
        <ul v-if="lawnamevec" id="lawnamevec">
          <span>Law Link：</span>
          <li v-for="lawname in lawnamevec" @click="ui.goToLawPage(lawname)">{{ lawname }}</li>
        </ul>

        <p>search by text</p>
        <input @input="searching" v-model="TheSearchingText" />
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
import { type Law, loadLaw } from '../../types/Law'
import LawCard from '../LawCard.vue'

const props = defineProps<{
  datax: {
    source: string
    related_law?: string
    name: string
    date: string
    reason: string
    maincontent: string[]
    casesummary: string
    casename: string
    reflaws: string[]
  }
}>()

const rawContent = ref('')
const realpage = ref<HTMLElement | null>(null)
const html = ref('')
const TheSearchingText = ref('')
const searchText = ref('')
const count = ref(0)
const goCount = ref(0)
const mainparts = ref('');
const reason = ref('')

const lawvec = ref<Law[]>([]);
const lawnamevec = ref<string[]>([]);
import { getApiUrl } from '../../utils/api.ts'
const ApiLink = getApiUrl();
onMounted(async () => {
  lawvec.value = [];
  lawnamevec.value = [];


  if (props.datax.reflaws) {
    let set = new Set(props.datax.reflaws);
    let array = Array.from(set) as string[];
    array.forEach(async id => {
      const [chapter, num] = id.split("-");
      lawnamevec.value.push(chapter);
      let law = await loadLaw(chapter, num, ApiLink);
      if (law) {
        lawvec.value.push(law);
      }
    })
  }

  let set = new Set(lawnamevec.value);
  lawnamevec.value = Array.from(set) as string[];

  await nextTick();

  mainparts.value = convertToHTML2(props.datax.maincontent);
  reason.value = convertToHTML(props.datax.reason);

})

watch(
  () => props.datax,
  async (data) => {
    lawvec.value = [];
    lawnamevec.value = [];


    if (props.datax.reflaws) {
      let set = new Set(data.reflaws);
      let array = Array.from(set) as string[];
      array.forEach(async id => {
        const [chapter, num] = id.split("-");
        lawnamevec.value.push(chapter);
        let law = await loadLaw(chapter, num, ApiLink);
        if (law) {
          lawvec.value.push(law);
        }
      })
    }

    let set = new Set(lawnamevec.value);
    lawnamevec.value = Array.from(set) as string[];

    await nextTick();

    mainparts.value = convertToHTML2(data.maincontent);
    reason.value = convertToHTML(data.reason);



  },
)

import { useUiStore } from '../../store/page.ts'
const ui = useUiStore();



const handleclicklaw = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target.classList.contains('spanlawname')) {
    const id = target.dataset.lawname;
    if (id) {
      ui.goToLawPage(id);
    }
  }
}

const convertToHTML = (text: string): string => {
  return text
    .split('】')
    .map(p => `<p>${p.replace(/\n/g, '')}】</p>`)
    .map(par => {
      lawnamevec.value.forEach(lawname => {
        const replacement = `<span class="spanlawname" data-lawname="${lawname}">${lawname}</span>`
        par = par.replace(new RegExp(lawname, "g"), replacement);
      })
      return par
    })
    .join('')
}


const convertToHTML2 = (text: string[]): string => {
  return text
    .map(p => `<p>${p.replace(/\n/g, '')}</p>`)
    .map(par => {
      lawnamevec.value.forEach(lawname => {
        const replacement = `<span class="spanlawname" data-lawname="${lawname}">${lawname}</span>`
        par = par.replace(new RegExp(lawname, "g"), replacement)
      })
      return par
    }).join('')
}


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
</script>

<style scoped>
#lawnamevec {
  list-style: none;
  padding: 0px;
}

#lawnamevec li {
  padding-left: 5px;
}

#lawnamevec li:hover {
  color: var(--primary-color);
  cursor: pointer;

}

span[lawname] {
  color: darkorange !important;
}

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



#page {
  min-width: 0;
  /* 重要：讓 grid 子元素可以收斂寬度 */
  overflow-wrap: break-word;
  /* 長字換行 */
  word-break: break-word;
}

#newinterpretation_area {
  display: grid;
  grid-template-columns: 4fr 1fr;
}

#realpage {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 3rem;
  margin-left: 0px;
  margin-top: 0px;
}

.hidelaw {
  align-self: center;

}

.law-card-title {
  display: flex;
  gap: 10px;
  align-items: center;
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

.content {
  font-size: 17px;
  margin: 10px 5px;
  line-height: 25px;
  color: #EAEAEA;
}

.content p {
  white-space: normal !important;
  word-wrap: break-word !important;
  word-break: break-word !important;
  max-width: 100%;

}


#toolarea {
  position: sticky;
  top: 10%;
}

#chapterlist {
  list-style: none;
  margin-left: 0;
  padding: 0;
}

#chapterlist li:hover {
  color: var(--primary-color);
}

#chapterlist li {
  padding-left: 5px;
}


input {
  padding: 5px;
}

a {
  text-decoration: none;
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

<script setup lang="ts">
  import {onMounted, ref, watch, onUnmounted} from 'vue'
  import type {Law, LawList, ChapterUl} from '../../types/Law.ts'
  import PrintChapter from '././PrintChapter.vue'


  const props = defineProps<{
  chapter: string;
  LawLists: LawList[]|null;
  UlLists: ChapterUl[]|null;
}>();


  
  const num = ref('');
  const searchChapter = ref('');
  const text = ref('');


   const lawlines = function(lines: string[]) {
    let buffer = "";
    lines.forEach( line => {
      if(line.includes(text.value)){
        line = line.replace(text.value, `<span class="highlight">${text.value}</span>`)
      }
      if(line.startsWith(' ')){
        buffer = buffer + `<div class=law-indent>${line}</div>`
      } else {
        buffer = buffer + `<li class="law-line">${line}</li>`
      }
      
    })
    return buffer
   }



  
  
  const IsSearching = function(lawnumber: string) {
    if(num.value === "") {
      return true
    }
    if(num.value === lawnumber) {
      return true
    }
    return false
  }

 
 const IsSearchingText = function(lines: string[]) {
    let bool: boolean = false;
    if(text.value === "") {
      bool = true;
    }
    lines.forEach(s => {
      if(s.includes(text.value)){
        bool = true
      }
    })
    return bool
  }


  
// 假設 entertext 與 bar 都是 data 中的變數
 </script>

<template> 
<div id="all-lines-area">
   <div id="all-lines">
    <div v-for = "LawListObj in LawLists">
      <div :id= "c" v-for= "c in LawListObj.chapter" class="alllineschapter"
        :class="{searchingChapter: c === searchChapter}" v-show="text === '' && num === ''">{{c}}</div>
      <div class="law-card" v-for = "law in LawListObj.laws" :id="chapter + law.num" v-show="IsSearching(law.num) && IsSearchingText(law.lines)">
        <div class="law-card-title"><p :class="{searchingNum: law.num === num}">第{{law.num}}條</p><p v-show="text !== '' || num !== ''">form：{{law.chapter}}</p></div>
        <ul class='law-block-lines'>
          <template v-for="line in law.lines" v-if="text === ''">
            <div v-if="line.startsWith(' ')" class="law-indent">{{line}}</div>
            <li v-else class="law-block-line">{{line}}</li>
          </template>
          <template v-else>
            <div v-html="lawlines(law.lines)"></div>
          </template>
        </ul>
      </div>
    </div>
  </div>
  <div id="all-chapter">
    <div id="realchapter">
    <PrintChapter v-if= "UlLists":ullist="UlLists" :chapter="chapter"/>
    <div id="searchbar">
    search by chapter
    <div id="searchbar-num">
      <input v-model="searchChapter"></input><a :href="'#' + searchChapter">go</a>
    </div>
    search by num
    <div id="searchbar-chapter">
      <input v-model="num"></input>
    </div>
    search by text
     <div id="searchbar-text">
      <input v-model="text"></input>
    </div>
  </div>
  </div>

  </div>
</div>
</template>

<style scoped>


#all-lines-area {
  display: flex;
  gap: 5px;
}

#all-lines {
  flex: 60%;
}

#all-chapter {
  flex: 30%;
  top: 20%;
  position: sticky;
}

#realchapter {
  top: 20%;
  position: sticky;
}


.alllineschapter {
  margin: 10px 0px;
  font-weight: 700;
  font-size: 1.2rem;
}

 #realchpater {
  top: 20%;
  position: sticky;
 }

  #searchbar-chapter, #searchbar-num {
    gap: 10px;
    display: flex;
  }
   
  #searchbar {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .searchingNum {
    color: darkorange;
  }

  .searchingChapter {
    color: darkorange;
  }
  
  a {
    text-decoration: none;
    color: white;
  }

</style>

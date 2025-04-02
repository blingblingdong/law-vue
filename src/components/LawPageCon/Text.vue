<script setup lang="ts">
  import {ref, computed} from 'vue' 
  import type {Law, LawList} from '../../types/Law.ts'
  

 const props = defineProps<{
  LawLists: LawList[]|null;
 }>();

 const text = ref('');
 const IsSearchingText = function(lines: string[]){
  let bool = false;
  lines.forEach(line => {
    if(line.includes(text.value)){
      bool = true;
    }
  })
  return bool;
 }

 const lawlines = function(lines: string[]){
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


</script>

<template v-if="LawList">
  <div id="searchTextArea">
  <input v-model="text" id="searchTextInput"></input>
  <div v-for = "LawListObj in LawLists">
    <div class="law-card" v-for = "law in LawListObj.laws" :id="law.chapter.pop() + law.num" v-show="IsSearchingText(law.lines) && text !== ''">
        <div class="law-card-title"><p>第{{law.num}}條</p><p v-show="text !== ''">form：{{law.chapter}}</p></div>
        <ul class='law-block-lines'>
          <div v-html="lawlines(law.lines)"></div>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
#searchTextInput {
  width: 80%;
  margin: 10px 10px;
  padding: 5px 10px;
}

#searchTextArea {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>

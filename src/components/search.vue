<script setup lang="ts">
import { ref, computed } from 'vue'
import { type Law, loadLaw, useProcessedLines } from '../types/Law.ts'

const lawName = ref('')
const lawNum = ref('')

import { getApiUrl } from '../utils/api.ts'

const ApiLink = getApiUrl();
const lines = ref<string[]>([])
const lines_show = ref(false)

const fastSearch = async (event: Event) => {
  if (lawName.value !== "" && lawNum.value !== "") {

    const law = await loadLaw(lawName.value, lawNum.value, ApiLink);
    if (law) {
      lines.value = law.lines;
      lines_show.value = true;
    }
  }
}

const { processedLines } = useProcessedLines(lines);
</script>

<template>

  <div id="search-area">
    <div id="search-law-form">
      <h2>快速查詢</h2>
      <div id='chapter-input-wrapper'>
        <a></a>
        <input @input="fastSearch" list="law-name-data" id="chapter" placeholder="XX法" v-model="lawName">
      </div>
      <div id='num-input-wrapper'>
        <p>§</p>
        <input @input="fastSearch" id='num' placeholder="條目" v-model="lawNum">
        </input>
      </div>
    </div>

    <div id='fast-search-result'>
      <div id='result-area'>
        <ul class='law-block-lines'>
          <template v-for="(line) in processedLines">
            <div v-if="line.isIndent" class="law-indent">{{ line.text }}</div>
            <li v-else class="law-block-line">{{ line.text }}</li>
          </template>
        </ul>
      </div>
      <div id='fast-search-tool-bar' v-if="lines_show">
        <div class='tool-bar-item'><i class="fa-solid fa-book"></i></div>
        <div class='tool-bar-item'><i class="fa-solid fa-bookmark"></i></div>
        <div class='tool-bar-item'><i class="fa-solid fa-pen"></i></div>
        <div class='tool-bar-item'><i class="fa-solid fa-asterisk"></i></div>
      </div>
    </div>

  </div>
</template>

<style scoped>
#search-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

#result-area {
  overflow-y: auto;
  border: 0px solid #444;
  margin-left: 30px;
  border-left: 10px solid var(--accent-color);
  padding: 10px;
}


#fast-search-result {
  display: flex;
  flex: 80% 20%;
  align-items: flex-start;
  margin-right: 10px;
}

#fast-search-tool-bar div {
  margin-bottom: 10px;
  padding: 10px 10px;
  border-top-right-radius: 10px;
}

.tool-bar-item i {
  font-size: 20px;
}


.tool-bar-item:hover {
  color: var(--primary-color);
}

.law-block-lines {
  text-align: left;
  font-size: 18px;
}

#search-law-form {
  margin-top: 50px;
  margin-left: 10px;
}

#num-input-wrapper {
  display: flex;
}

#search-law-form input,
#search-law-form textarea {
  background-color: black;
  color: #fff;
}

#chapter {
  margin-right: 0px !important;
  font-weight: bold;
  box-sizing: border-box;
  box-sizing: border-box;
  font-size: 25px;
  border: none;
  z-index: 2;
}

#num {
  text-align: left;
  background-color: black;
  font-size: 30px;
  border: none;
  outline: none;
}

@media only screen and (max-width: 500px) {
  #chapter {
    font-size: 20px;
  }

  #num {
    font-size: 20px;
  }

  #num-input-wrapper p {
    font-size: 15px;
  }

}



#num-input-wrapper p {
  font-size: 20px;
  margin-left: 50px;
}

#num-input-wrapper input {
  background-color: black;
}

#search-law-form a {
  text-align: left;
  margin-left: 0px;

}

#num:after {
  content: "§";
  font-size: 200px;
}

#num:focus {
  background-color: black;
  /* 焦點時保持背景為白色 */
  /* 可以這裡設定其他焦點時的樣式，比如邊框顏色等 */
}

#chapter-input-wrapper a::before {
  content: "";
  transform: rotate(45deg);
  border-top: 3px solid white;
  margin-right: 10px;
  height: 8px;
  width: 8px;
  border-right: 3px solid white;
}


/* 覆蓋 Chrome 自動填充的背景顏色 */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s;
  -webkit-text-fill-color: white !important;
  background-color: black !important;
  box-shadow: 0 0 0px 1000px black inset !important;
}


#chapter-input-wrapper a {
  display: flex;
  position: relative;
  align-items: center;
  padding: 30px 0 30px 33px;
}


#chapter-input-wrapper {
  display: flex;
  align-items: center;
}


#chapter-input-wrapper a::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 80px;
  width: 80px;
  border: 2px solid darkorange;
  border-radius: 50%;
}
</style>

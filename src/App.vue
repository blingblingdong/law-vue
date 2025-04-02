<script setup lang="ts">
import search from './components/search.vue'
import LawPage from './components/LawPage.vue'
import MyFile from './components/MyFile.vue'
import FilePage from './components/FilePage.vue'
import GalleryPage from './components/GalleryPage.vue'
import { ref, onMounted } from 'vue'
import type { UrlGallery } from './types/Folder.ts'

const ApiUrl = 'https://deploylawweb-production.up.railway.app'
const dataOption = ref('')
const sidebar = ref(false);
const nowPage = ref('查詢');
const urltogallery = ref<UrlGallery | null>(null)


onMounted(async () => {
  try {
    const res = await fetch(`${ApiUrl}/all_chapters`);
    dataOption.value = await res.text();
  } catch (error) {
    console.error('API 請求失敗：', error)
  }
})

let mainli = ref<string[]>(["查詢", "法條", "資料夾", "畫廊"]);

const PageHandel = function (li: string) {
  nowPage.value = li;
  if (sidebar.value) {
    sidebar.value = false;
  }
}

const urlParams = new URLSearchParams(window.location.search);
const userid = urlParams.get('user');
const directory = urlParams.get('dir');
const file_name = urlParams.get('file_name');

if (userid && directory) {
  nowPage.value = "畫廊";
  urltogallery.value = { directory: directory, user_name: userid, page: 'FirstPage' };
  if (file_name) {
    urltogallery.value = { directory: directory, user_name: userid, file: file_name, page: 'NotePage' };
  }

}

</script>

<template>
  <div class="header-container">
    <div class="header">
      <img src='/訪客.png' id='guest-png' class='user-btn catpng'>
      <img src='/cat.png' style='display:none' id='user-png' class='user-btn catpng'>
      <div class="header-title search-btn" id='big-header'>Rust Law Web</div>
    </div>

    <div class='header-title search-btn' id='small-header'>Rust Law web</div>

    <ul class="navbar hider">
      <li v-for="li in mainli" @click="PageHandel(li)"><a>{{ li }}</a></li>
    </ul>
    <ul class="sidebar" v-if="sidebar">
      <li @click="sidebar = false"><a>關閉</a></li>
      <li v-for="li in mainli" @click="PageHandel(li)">{{ li }}</li>
    </ul>

    <button class="ham-but" @click='sidebar = true'><i class="fa-solid fa-burger"></i></button>
  </div>
  <datalist id="law-name-data" v-html='dataOption'></datalist>
  <search v-if="nowPage === '查詢'" />
  <LawPage v-else-if="nowPage === '法條'" />
  <MyFile v-else-if="nowPage === '資料夾'" />
  <GalleryPage v-else-if="nowPage === '畫廊'" :TheUrl="urltogallery" />
</template>

<style scoped>
@media only screen and (max-width: 600px) {
  .ham-but {
    display: block !important;
  }

  .hider {
    display: none !important;
  }

}

.ham-but {
  display: none;
  top: 30px;
  right: 0px;
  font-size: 30px;
  background-color: black;
  color: white;
  border: none;
}



.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  top: 10px;
  z-index: 0;
}


#small-header {
  display: none;
}

option {
  font-size: 20px;
}


.header-title {
  font-size: 30px;
  color: darkorange;
  text-align: center;
  font-family: "Playwrite DE Grund", cursive;
}

@media only screen and (max-width: 600px) {
  .header-title {
    font-size: 30px;
  }

  #big-header {
    display: none;
  }

  #small-header {
    display: flex;
  }
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
}

.navbar li:not(:last-child) {
  margin-right: 50px;
}

.navbar li:last-child {
  margin-right: 20px;
}

.main-li {
  font-weight: 700;
  text-align: center;
}

.main-li a {
  display: flex;
  color: white;
  text-align: center;
  font-size: 18px;
  text-decoration: none;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 250px;
  z-index: 999;
  opacity: 0.8;
  background-color: black;
  list-style: none;
}

.sidebar li {
  padding: 10px 5px;

}

.header {
  display: flex;
}

.main-li a {
  z-index: 9999 !important;
  position: relativeri
}


.catpng {
  width: 60px;
  border-radius: 50%;
}
</style>

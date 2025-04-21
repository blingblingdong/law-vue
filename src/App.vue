<script setup lang="ts">
import search from './components/search.vue'
import LawPage from './components/LawPage.vue'
import MyFile from './components/MyFile.vue'
import FilePage from './components/FilePage.vue'
import GalleryPage from './components/GalleryPage.vue'
import LawSourcePage from './components/LawSourcePage.vue'
import { ref, onMounted } from 'vue'
import type { UrlGallery } from './types/Folder.ts'

const ApiUrl = 'https://deploylawweb-production.up.railway.app'
const dataOption = ref('')
const sidebar = ref(false);
const nowPage = ref('查詢');
const urltogallery = ref<UrlGallery | null>(null)

document.addEventListener('keydown', function (event) {
  // 例如，如果用戶按下 Ctrl+D
  if (event.ctrlKey && event.key === 's') {
    nowPage.value = "查詢";
    event.preventDefault();  // 阻止預設行為，例如阻止書籤對話框的出現

    // 在這裡添加更多的動作，如打開自訂對話框等
  } else if (event.ctrlKey && event.key === 'n') {
    nowPage.value = "資料夾";
    event.preventDefault();
  }
});



onMounted(async () => {
  try {
    const res = await fetch(`${ApiUrl}/all_chapters`);
    dataOption.value = await res.text();
  } catch (error) {
    console.error('API 請求失敗：', error)
  }
})

let mainli = ref<string[]>(["查詢", "資料夾", "畫廊"]);

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

const activecolor = (page: string) => {
  const color = page === nowPage.value ? 'darkorange' : 'white';
  return color
}


const showsidebar = ref(true);
</script>

<template>

  <div id="realbody">



    <div>
      <div id="thesidebar" v-show="showsidebar">
        <img src='/訪客貓.png' id='user-png' class='user-btn catpng'>
        <div id="pagelist">
          <i class="fa-solid fa-magnifying-glass" @click="nowPage = '查詢'" :style="{ color: activecolor('查詢') }"></i>
          <i class="fa-solid fa-folder" @click="nowPage = '資料夾'" :style="{ color: activecolor('資料夾') }"></i>
          <i class="fa-solid fa-globe" @click="nowPage = '畫廊'" :style="{ color: activecolor('畫廊') }"></i>
          <i class="fa-solid fa-xmark" @click="showsidebar = false"></i>
        </div>
      </div>
    </div>
    <div id="main-content">
      <datalist id="law-name-data" v-html='dataOption'></datalist>
      <LawSourcePage v-show="nowPage === '查詢'" />
      <MyFile v-show="nowPage === '資料夾'" />
      <GalleryPage v-show="nowPage === '畫廊'" :TheUrl="urltogallery" />
    </div>
  </div>


  <i class="fa-solid fa-bars" id="bars" @click="showsidebar = true" v-show="!showsidebar"></i>

</template>

<style scoped>
#realbody {
  display: grid;
  grid-template-columns: 1fr 100fr;
  gap: 10px;
}


#thesidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: sticky;
  top: 5%;
  margin-top: 40px;
}

#bars {
  position: fixed;
  top: 5%;
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

#pagelist {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
  position: sticky;
}

#pagelist i {
  font-size: 20px;
}



#app,
body {
  background-color: black !important;
  color: white !important;
}

.header-container {
  display: flex;
  justify-content: center;
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
  font-size: 25px;
  color: darkorange;
  text-align: center;
  font-family: "Playwrite DE Grund", cursive;
}

@media only screen and (max-width: 600px) {}


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

.navbar a:hover {
  color: darkorange;
  cursor: pointer;
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
  justify-content: center;
}

.main-li a {
  z-index: 9999 !important;
  position: relativeri
}


.catpng {
  width: 50px;
  border-radius: 50%;
}
</style>

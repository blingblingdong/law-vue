<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Folder, UrlGallery } from '../types/Folder.ts'

const FolderNoteList = ref<string[] | null>([])
import { useUiStore } from '../store/page.ts'
const ui = useUiStore()

const props = defineProps<{
  TheUrl: UrlGallery | null;
  TheDirectory: Folder | null;
}>();

const sharefolder = () => {
  const url = `https://rustlawweb.netlify.app/?user=${props.TheDirectory?.user_name}&dir=${props.TheDirectory?.directory}`
  navigator.share({
    url: url,
  })
}

const clickFile = async (notename: string) => {
  let id = props.TheDirectory?.id + "-" + notename;
  ui.goToFile(id);
}

</script>



<template>
  <div id="FolderFirstPage" v-if="TheDirectory">
    <div id='public-file-first-header'>
      <div id="in-public-folder-name">{{ TheDirectory.directory }}</div>
      <div id='public-folder-first-header-second-bar'>
        <div class='button-list'>
          <div @click="sharefolder">離開</div>
          <div id='share-public-folder'>分享</div>
        </div>
      </div>
    </div>
    <div id="in-public-folder-writer">{{ TheDirectory.user_name }}</div>
    <div class="description">作品簡介</div>
    <div id="public-file-word-area-first-description">{{ TheDirectory.description }}</div>
    <div class='catlog'>目錄</div>
    <div id="public-file-word-area-first-file-list">
      <ul id="public-file-list-ul">
        <li v-if="FolderNoteList" v-for="foldernotename in TheDirectory.note_order">
          <a @click="clickFile(foldernotename)">{{ foldernotename }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#FolderFirstPage {
  margin: 10px;
}


#public-file-list-ul li:hover {
  background-color: var(--text-color);
  color: black;

}

#public-file-list-ul li {
  padding: 5px 5px;
}



.catlog,
.description {
  font-size: 1.1rem;
  font-weight: 500;
  /* 正確的 font-weight 應該是沒有單位的 */
  line-height: 3rem;
}

#public-file-list-ul,
#private-file-list-ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-left: 0px;
  padding-left: 0px;
}

#folder-information-description {
  margin-left: 5%;
}

#public-folder-file-word-area {
  width: 100%;
}

#in-public-folder-name,
#folder-information-title {
  font-weight: 1000;
  font-size: 1.3rem;
  color: var(--primary-color);
}


#in-public-folder-writer {
  font-weight: 500;
  font-size: 1.1rem;
}

#public-file-word-area-first {
  gap: 10px;
  display: flex;
  flex-direction: column;
}

#public-file-first-header {
  display: flex;
  gap: 10px;
  align-items: center;
}

.button-list {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

#folder-information-flex {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

#public-file-word-area-first-description {
  margin-left: 5%;
}

.catlog:after,
.description:after {
  display: block;
  content: "";
  right: 0;
  width: 80%;
  height: 0.5px;
  background-color: var(--text-color);
  /* 設置底線顏色 */
}
</style>

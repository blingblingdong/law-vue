<template>
  <div id="galleryFindPage">
    <div id="breadsheet" v-show="NowPage !== 'GalleryPage'">
      <a @click="NowPage = 'GalleryPage'">gallery</a><a v-if="folderName" @click="ToFolderbread(folderName)"> >
        {{ folderName }}</a><a v-if="TheNote && NowPage === 'NotePage'"> > {{ TheNote.file_name }}</a>
    </div>
    <div id="public-folder-find-page" v-show="NowPage === 'GalleryPage'">
      <div id="gallery-show-type">
        <span>
          <a @click="searchtype = 'file'" :class="{ onsearch: searchtype === 'file' }">文件</a><a>/</a>
          <a @click="searchtype = 'folder'" :class="{ onsearch: searchtype === 'folder' }">資料夾</a>
        </span>
        <input id="public-folder-name" placeholder="查詢" v-model="input">
      </div>
      <div id="public-dir-display" v-if="searchtype === 'folder' && folderlist">
        <div class='AdisplayFolder' v-for="folder in folderlist" v-show="foldershow(folder.directory)"
          @click="ToFolder(folder)">
          <h2 class='AdisplayFolder-FolderName'>{{ folder.directory }}</h2>
          <div class='AdisplayFolder-writer'>write by：<span>{{ folder.user_name }}</span></div>
          <div class='AdisplayFolder-description'>簡介<span>{{ folder.description }}</span></div>
        </div>
      </div>
      <div id="AdisplayFile-area" v-if="searchtype === 'file' && notelist">
        <div class='AdisplayFile' v-for="note in notelist" v-show="foldershow(note.file_name)" @click="ToFile(note)">
          <h2 class='AdisplayFile-fileName'>{{ note.file_name }}</h2>
          <div class='AdisplayFile-writer'>write by：<span>{{ note.user_name }}</span></div>
          <div class='AdisplayFile-dirName'>From：<span>{{ note.directory }}</span></div>
        </div>
      </div>
    </div>
    <div id="FolderFirstPage" v-show="NowPage === 'FirstPage'">
      <div id='public-file-first-header'>
        <div id="in-public-folder-name">{{ folderName }}</div>
        <div id='public-folder-first-header-second-bar'>
          <div class='button-list'>
            <div @click="sharefolder">離開</div>
            <div id='share-public-folder'>分享</div>
          </div>
        </div>
      </div>
      <div id="in-public-folder-writer">{{ folderWriter }}</div>
      <div class="description">作品簡介</div>
      <div id="public-file-word-area-first-description">{{ folderDescription }}</div>
      <div class='catlog'>目錄</div>
      <div id="public-file-word-area-first-file-list">
        <ul id="public-file-list-ul">
          <li v-if="FolderNoteList" v-for="foldernotename in FolderNoteList">
            <a @click="FolderToFile(foldernotename)">{{ foldernotename }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div id="publicFilePage" v-show="NowPage === 'NotePage'" v-if="TheNote">
      <FilePage :theNote="TheNote" :theNoteNav="TheNav" v-if="TheNote" />
    </div>
  </div>
</template>

<style scoped>
#publicFilePage {
  margin: 10px;
}

#breadsheet {
  padding: 5px 10px;
  position: sticky;
  top: 10%;
}

#breadsheet a {
  font-size: 1.2rem;
}



#public-file-list-ul li:hover {
  background-color: white;
  color: black;

}

#public-file-list-ul li {
  padding: 10px 10px;
}


#gallery-show-type {
  display: flex;
  gap: 10px;
  align-items: center;
}

#gallery-show-type input {
  flex: 60%;
  padding: 10px 10px;
  margin: 20px 10px;
}

#galleryFindPage {
  margin-top: 20px;
}

.onsearch {
  color: var(--primary-color);
}

.catlog,
.description {
  font-size: 1.2rem;
  font-weight: 500;
  /* 正確的 font-weight 應該是沒有單位的 */
  line-height: 3rem;
  margin-left: 40px;
}

#public-file-list-ul,
#private-file-list-ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
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
  font-size: 2rem;
  color: darkorange;
}


#in-public-folder-writer {
  font-weight: 500;
  font-size: 20px;
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
  position: absolute;
  right: 0;
  margin-left: 60px;
  width: 97%;
  height: 0.5px;
  background-color: white;
  /* 設置底線顏色 */
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FilePage from './FilePage.vue'
import type { Folder, UrlGallery } from '../types/Folder.ts'
import type { H2Nav, Note } from '../types/Note.ts'
import { get_every_note, get_note_list, get_note, get_note_nav } from '../types/Note.ts'
import { get_every_folders, get_folder } from '../types/Folder.ts'
const searchtype = ref('folder');
const folderlist = ref<null | Folder[]>(null);
import { getApiUrl } from '../utils/api.ts'

const ApiLink = getApiUrl();
const notelist = ref<null | Note[]>(null);
const input = ref('');
const folderName = ref('');
const folderWriter = ref('');
const folderDescription = ref('');
const NowPage = ref('GalleryPage');
const FolderNoteList = ref<string[] | null>([])
const TheNote = ref<null | Note>(null)
const TheNav = ref<null | H2Nav[]>(null)

const props = defineProps<{
  TheUrl: UrlGallery | null;
}>();



const foldershow = function (foldername: string) {
  let bool = true;
  if (input.value !== "") {
    bool = foldername.includes(input.value);
  }
  return bool
}

const ToFolderbread = async function (foldername: string) {
  NowPage.value = "FirstPage";
  if (folderWriter.value && folderName.value) {
    let folder = await get_folder(ApiLink, folderWriter.value, folderName.value);
    FolderNoteList.value = await get_note_list(ApiLink, folderWriter.value, folderName.value);
    if (folder) {
      folderDescription.value = folder?.description;
    }
  }
}


const ToFolder = async function (folder: Folder) {
  NowPage.value = "FirstPage";
  folderName.value = folder.directory;
  folderDescription.value = folder.description;
  folderWriter.value = folder.user_name;
  FolderNoteList.value = await get_note_list(ApiLink, folderWriter.value, folderName.value);
}

const ToFile = async function (note: Note) {
  TheNav.value = await get_note_nav(ApiLink, note.id);
  NowPage.value = "NotePage";
  TheNote.value = note;
  folderName.value = note.directory;
  folderWriter.value = note.user_name;
}

const FolderToFile = async function (notename: string) {
  NowPage.value = "NotePage";
  TheNote.value = await get_note(ApiLink, folderWriter.value, folderName.value, notename);
  TheNav.value = await get_note_nav(ApiLink, `${folderWriter.value}-${folderName.value}-${notename}`);

}


onMounted(async () => {
  folderlist.value = await get_every_folders(ApiLink);
  notelist.value = await get_every_note(ApiLink);
  if (props.TheUrl) {
    folderWriter.value = props.TheUrl.user_name;
    folderName.value = props.TheUrl.directory;
    NowPage.value = props.TheUrl.page;
    if (props.TheUrl.file) {
      TheNote.value = await get_note(ApiLink, folderWriter.value, folderName.value, props.TheUrl.file);
      TheNav.value = await get_note_nav(ApiLink, `${folderWriter.value}-${folderName.value}-${props.TheUrl.file}`);

    } else {
      let folder = await get_folder(ApiLink, folderWriter.value, folderName.value);
      FolderNoteList.value = await get_note_list(ApiLink, folderWriter.value, folderName.value);
      if (folder) {
        folderDescription.value = folder?.description;
      }
    }
  }

}
)

const sharefolder = () => {
  const url = `https://rustlawweb.netlify.app/?user=${folderWriter.value}&dir=${folderName.value}`
  navigator.share({
    url: url,
  })
}


</script>

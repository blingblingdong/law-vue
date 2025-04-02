<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import FilePage from './FilePage.vue'
import type { Folder } from '../types/Folder.ts'
import type { H2Nav, Note } from '../types/Note.ts'
import { get_every_note, get_note_list, get_note, get_note_nav, create_note } from '../types/Note.ts'
import { get_every_folders, get_folder } from '../types/Folder.ts'
const folderlist = ref<null | Folder[]>(null);

import { getApiUrl } from '../utils/api.ts'

const ApiLink = getApiUrl();
const notelist = ref<null | string[]>(null);
const input = ref('');
const TheNote = ref<null | Note>(null)
const TheNav = ref<null | H2Nav[]>(null)
const user = ref<string>("test_user");
const FolderNow = ref<string>("")
const inputFileName = ref<string>('')
const showCreateFile = ref<boolean>(false);
const showsidebar = ref<boolean>(true);




onMounted(async () => {
  folderlist.value = await get_every_folders(ApiLink);
}
)

const clickFolder = async (folder_name: string) => {
  notelist.value = await get_note_list(ApiLink, user.value, folder_name);
  FolderNow.value = folder_name;
}

const clickNote = async (notename: string) => {
  TheNote.value = await get_note(ApiLink, user.value, FolderNow.value, notename);
  TheNav.value = await get_note_nav(ApiLink, `${user.value}-${FolderNow.value}-${notename}`);
}

const createNote = async () => {
  let id = user.value + "-" + FolderNow.value + "-" + inputFileName.value;
  let note: Note = { id: id, user_name: user.value, footer: null, content: null, file_name: inputFileName.value, directory: FolderNow.value };
  await create_note(ApiLink, note);
  await nextTick();
  notelist.value = await get_note_list(ApiLink, user.value, FolderNow.value);
  showCreateFile.value = false;
}

</script>



<template>
  <div id="privateArea">
    <i class="fa-solid fa-folder folderControll" v-show="showsidebar" @click="showsidebar = false"></i>
    <i class="fa-solid fa-folder-open folderControll" v-show="!showsidebar" @click="showsidebar = true"></i>

    <div id="privateFolder" v-show="showsidebar">
      <ul id="privateFolderList" v-if="folderlist">
        <p>資料夾 +</p>
        <li class='privateFolderName' v-for="folder in folderlist">
          <a @click.prevent="clickFolder(folder.directory)">{{ folder.directory }}</a>
        </li>
      </ul>
    </div>
    <div id="privateNote" v-show="showsidebar">
      <ul id="privateNoteList" v-if="notelist">
        <span>{{ FolderNow }}</span>
        <li class='privateNoteName' v-for="note in notelist">
          <a @click.prevent="clickNote(note)">{{ note }}</a>
        </li>
        <div id="crateFile" v-if="showCreateFile">
          <input v-model="inputFileName"></input>
          <button @click="createNote">create</button>
          <button>cancel</button>
        </div>
        <li class="addNote">
          <a @click.prevent="showCreateFile = true">新增文件</a>
        </li>
      </ul>
      <div v-else>
        <h3>No Note yet</h3>
      </div>
    </div>
    <div id="privateFile" v-if="TheNote">
      <FilePage :theNote="TheNote" :theNoteNav="TheNav" v-if="TheNote" />
    </div>
    <div v-else>
      <h3>No note yet</h3>
    </div>
  </div>
</template>

<style scoped>
#crateFile button {
  margin-left: 5px;
}

#crateFile input {
  margin: 5px;
}

li {
  list-style: none;
  padding: 5px 5px;
}

ul {
  padding-left: 0px;
  position: fixed;
  top: 10%;
}

ul span {
  color: var(--primary-color);
  font-weight: 700;
  font-size: 1.2rem;
}

.addNote a {
  background-color: var(--primary-color);
  padding-right: 10px;
  padding-left: 5px;
  padding-bottom: 10px;
  padding-top: 10px;
  border-radius: 5px;
  color: black;
  font-weight: bold;
}

.addNote {
  margin-top: 15px;
}

#privateArea {
  display: flex;
}

#privateFolder {
  flex: 15%;
  min-width: 100px;
}

#privateNote {
  flex: 15%;
  min-width: 100px;
}

#privateFile {
  flex: 70%;
}

#privateFile {
  margin: 10px;
}

.folderControll {
  top: 10%;
  position: fixed;
}
</style>

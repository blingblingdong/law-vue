<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import FilePage from './FilePage.vue'
import type { Folder } from '../types/Folder.ts'
import type { H2Nav, Note } from '../types/Note.ts'
import { get_every_note, get_note_list, get_note, get_note_nav, create_note, create_dir } from '../types/Note'
import { get_every_folders, get_folder } from '../types/Folder'
const folderlist = ref<null | Folder[]>(null);
import swal from 'sweetalert'


import { getApiUrl } from '../utils/api'
import { useAccountStore } from '../store/page'

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
const notShowNote = ref(true);

interface FocusOn {
  type: string,
  position: number,
}
const focuson = ref<FocusOn>({ type: "folder", position: 0 });
const IsFocus = (type: string, name: string) => {
  var flag = false;
  if (focuson.value.type === type && folderlist.value) {
    var number = focuson.value.position;
    var thename = folderlist.value[number].directory;
    if (thename === name) {
      flag = true;
    }
  }

  if (focuson.value.type === type && notelist.value) {
    var number = focuson.value.position;
    var thename = notelist.value[number];
    if (thename === name) {
      flag = true;
    }
  }

  return flag;
}

document.addEventListener('keydown', async function (event) {

  if (focuson.value.type === "folder" && folderlist.value) {
    // 例如，如果用戶按下 Ctrl+D
    if (event.key === 'ArrowDown') {
      if (folderlist.value?.length - 1 == focuson.value.position) {
        focuson.value.position = 0;
      } else {
        focuson.value.position += 1;
      }
      event.preventDefault();  // 阻止預設行為，例如阻止書籤對話框的出現
      // 在這裡添加更多的動作，如打開自訂對話框等
    }

    if (event.key === 'ArrowUp') {
      if (focuson.value.position == 0) {
        focuson.value.position = folderlist.value?.length - 1;
      } else {
        focuson.value.position -= 1;
      }
      event.preventDefault();  // 阻止預設行為，例如阻止書籤對話框的出現
      // 在這裡添加更多的動作，如打開自訂對話框等
    }


    if (event.key === 'Enter') {
      await clickFolder(folderlist.value[focuson.value.position].directory)
      await nextTick();
      event.preventDefault();  // 阻止預設行為，例如阻止書籤對話框的出現
      // 在這裡添加更多的動作，如打開自訂對話框等
    }

  }

  if (focuson.value.type === "note" && notelist.value) {
    // 例如，如果用戶按下 Ctrl+D
    if (event.key === 'ArrowDown') {
      if (notelist.value.length - 1 == focuson.value.position) {
        focuson.value.position = 0;
      } else {
        focuson.value.position += 1;
      }
      event.preventDefault();  // 阻止預設行為，例如阻止書籤對話框的出現
      // 在這裡添加更多的動作，如打開自訂對話框等
    }

    if (event.key === 'ArrowUp') {
      if (focuson.value.position == 0) {
        focuson.value.position = notelist.value.length - 1;
      } else {
        focuson.value.position -= 1;
      }
      event.preventDefault();  // 阻止預設行為，例如阻止書籤對話框的出現
      // 在這裡添加更多的動作，如打開自訂對話框等
    }


    if (event.key === 'Enter') {
      await clickNote(notelist.value[focuson.value.position])

      event.preventDefault();  // 阻止預設行為，例如阻止書籤對話框的出現
      // 在這裡添加更多的動作，如打開自訂對話框等
    }

  }

  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    if (focuson.value.type === "folder" && notelist.value) {
      focuson.value.type = "note";
    } else if (focuson.value.type === "note" && notelist.value) {
      focuson.value.type = "folder";
    }

    event.preventDefault();  // 阻止預設行為，例如阻止書籤對話框的出現
    // 在這裡添加更多的動作，如打開自訂對話框等
  }



});


const openSideBar = () => {
  // 1.將筆記本頁關閉
  notShowNote.value = true;
  //2.將筆記導覽開啟
  showsidebar.value = true;
}

const closeTheSideBar = () => {
  // 1.將筆記本頁開啟
  notShowNote.value = false;
  //2.將筆記導覽關閉
  showsidebar.value = false;
}



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
  notShowNote.value = false;
  showsidebar.value = false;
}

const createNote = async () => {
  let id = user.value + "-" + FolderNow.value + "-" + inputFileName.value;
  let note: Note = { id: id, user_name: user.value, footer: null, content: null, file_name: inputFileName.value, directory: FolderNow.value, public: true };
  await create_note(ApiLink, note);
  await nextTick();
  notelist.value = await get_note_list(ApiLink, user.value, FolderNow.value);
  showCreateFile.value = false;
}


const account = useAccountStore();

const createDir = async () => {
  let res = await create_dir(ApiLink, account.username as string, inputDirName.value);
  if (res) {
    swal("創建成功!");
    folderlist.value = await get_every_folders(ApiLink);
  } else {
    swal("失敗...")
  }
  showCreateDir.value = false;
}

const showCreateDir = ref(false);
const inputDirName = ref("");
</script>



<template>
  <div id="privateArea">
    <i class="fa-solid fa-folder folderControll" v-show="showsidebar" @click="closeTheSideBar"></i>
    <i class="fa-solid fa-folder-open folderControll" v-show="!showsidebar" @click="openSideBar"></i>

    <div id="privateFolderAndNote" v-show="showsidebar">
      <div id="privateFolder">
        <ul id="privateFolderList" v-if="folderlist">
          <p @click="showCreateDir = true">新增筆記本 +</p>
          <div id="crateDir" v-if="showCreateDir">
            <input v-model="inputDirName"></input>
            <button @click="createDir">create</button>
            <button>cancel</button>
          </div>
          <li class='privateFolderName' v-for="folder in folderlist"
            :class="{ focusFolder: IsFocus('folder', folder.directory), showfolder: FolderNow === folder.directory }">
            <a @click.prevent="clickFolder(folder.directory)">{{ folder.directory }}</a>
          </li>
        </ul>
      </div>
      <div id="privateNote">
        <ul id="privateNoteList" v-if="notelist">
          <span>{{ FolderNow }}</span>
          <li class='privateNoteName' v-for="note in notelist" :class="{ focusFolder: IsFocus('note', note) }">
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
      </div>
    </div>
    <div id="privateFile" v-if="TheNote" :class="{ notshowNote: notShowNote }">
      <FilePage :theNote="TheNote" :theNoteNav="TheNav" v-if="TheNote" />
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

a:hover {
  color: var(--primary-color);
  cursor: pointer;
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
  padding-bottom: 5px;
  padding-top: 5px;
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

#privateFolder,
#privateFile {
  min-width: 100px;
}


#privateFile {
  flex: 70%;
}

#privateFile {
  margin: 10px;
}

#privateFolderAndNote {
  display: flex;
  gap: 50px;
  flex: 100%;
}

.folderControll {
  top: 10%;
  position: fixed;
}

.notshowNote {
  display: none !important;
}


@media only screen and (max-width: 600px) {
  .notshowNote {
    display: none !important;
  }


}

.privateFolderName {
  margin: 10px 0px;
}

.showfolder {
  color: var(--primary-color);
}

.focusFolder {
  border: 1px solid white;
  border-radius: 4px;
}
</style>

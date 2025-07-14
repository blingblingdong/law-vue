<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import FilePage from './FilePage.vue'
import FolderPage from './Folder.vue';
import type { Folder } from '../types/Folder.ts'
import type { H2Nav, Note } from '../types/Note.ts'
import { get_every_note, get_note_list, get_note, get_note_nav, create_note, create_dir } from '../types/Note'
import { get_every_folders, get_folder, update_note_order, get_note_order, delete_folder, update_dir_information } from '../types/Folder'
const folderlist = ref<null | Folder[]>(null);
import swal from 'sweetalert'
const ordering = ref(false);



import { getApiUrl } from '../utils/api'
import { useAccountStore } from '../store/page'

const FolderNow = ref<null | Folder>(null);
const ApiLink = getApiUrl();
const notelist = ref<null | string[]>(null);
const input = ref('');
const TheNote = ref<null | Note>(null)
const TheNav = ref<null | H2Nav[]>(null)
const inputFileName = ref<string>('')
const showCreateFile = ref<boolean>(false);
const showsidebar = ref<boolean>(true);
const notShowNote = ref(true);
const showFolder = ref(false);
import { Pen as PenIcon } from 'lucide-vue-next';
const showWriteDes = ref(false);




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

const confirmOrder = async () => {
  if (notelist && account.username) {
    let result = await update_note_order(ApiLink, account.username as string, FolderNow.value?.directory as string, notelist.value as string[]);
    if (result) {
      swal("創建成功")
    } else {
      swal("創建失敗")
    }
  }
  ordering.value = false;
}

document.addEventListener('keydown', async function (event) {

  if (!showsidebar.value) {
    return;
  }

  if (focuson.value.type === "folder" && folderlist.value) {
    if (event.key === 'ArrowDown') {
      if (folderlist.value?.length - 1 == focuson.value.position) {
        focuson.value.position = 0;
      } else {
        focuson.value.position += 1;
      }
      event.preventDefault();
    }

    if (event.key === 'ArrowUp') {
      if (focuson.value.position == 0) {
        focuson.value.position = folderlist.value?.length - 1;
      } else {
        focuson.value.position -= 1;
      }
      event.preventDefault();
    }


    if (event.key === 'Enter') {
      await clickFolder(folderlist.value[focuson.value.position].directory, focuson.value.position)
      await nextTick();
    }

  }

  if (focuson.value.type === "note" && notelist.value) {
    if (event.key === 'ArrowDown') {
      if (notelist.value.length - 1 == focuson.value.position) {
        focuson.value.position = 0;
      } else {
        focuson.value.position += 1;
      }
      event.preventDefault();
    }

    if (event.key === 'ArrowUp') {
      if (focuson.value.position == 0) {
        focuson.value.position = notelist.value.length - 1;
      } else {
        focuson.value.position -= 1;
      }
      event.preventDefault();
    }


    if (event.key === 'Enter') {
      await clickNote(notelist.value[focuson.value.position])

      event.preventDefault();
    }

  }

  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    if (focuson.value.type === "folder" && notelist.value) {
      focuson.value.type = "note";
    } else if (focuson.value.type === "note" && notelist.value) {
      focuson.value.type = "folder";
    }
    focuson.value.position = 0;
    event.preventDefault();
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

const clickFolder = async (folder_name: string, index: number) => {
  notelist.value = await get_note_order(ApiLink, account.username as string, folder_name);
  if (folderlist.value) {
    focuson.value.position = index;
    const folder = folderlist.value[index];
    FolderNow.value = folder;
  }
}

const clickNote = async (notename: string) => {
  TheNote.value = await get_note(ApiLink, account.username as string, FolderNow.value?.directory as string, notename);
  TheNav.value = await get_note_nav(ApiLink, `${account.username as string}-${FolderNow.value?.directory}-${notename}`);
  notShowNote.value = false;
  showsidebar.value = false;
}

const createNote = async () => {
  let id = account.username as string + "-" + FolderNow.value?.directory + "-" + inputFileName.value;
  let note: Note = { id: id, user_name: account.username as string, footer: null, content: null, file_name: inputFileName.value, directory: FolderNow.value?.directory as string, public: true };
  await create_note(ApiLink, note);
  await nextTick();
  notelist.value = await get_note_order(ApiLink, account.username as string, FolderNow.value?.directory as string);
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

const moveup = (index: number) => {
  if (notelist.value != null) {
    const tmp = notelist.value[index - 1];
    notelist.value[index - 1] = notelist.value[index];
    notelist.value[index] = tmp;
  }
}

const movedown = (index: number) => {
  if (notelist.value != null) {
    const tmp = notelist.value[index + 1];
    notelist.value[index + 1] = notelist.value[index];
    notelist.value[index] = tmp;
  }
}

const delete_the_folder = async () => {
  const willDelete = await swal({
    title: "確定要刪除資料夾?",
    text: "資料夾裡的文件會被ㄧ起刪除！",
    icon: "warning",
    dangerMode: true,
  });

  if (willDelete) {
    let res = await delete_folder(ApiLink, account.username as string, FolderNow.value?.directory as string);
    if (res) {
      swal("Deleted!", `${FolderNow} has been deleted!`, "success");
    } else {
      swal("Oops!", "Seems like we couldn't fetch the info", "error");
    }
  }

}

const clickDi = () => {
  notShowNote.value = true;
  showsidebar.value = false;
  showFolder.value = true;
  TheNote.value = null;
}

const sharefolder = (TheDirectory: Folder) => {
  const url = `https://vuelawweb.netlify.app/?user=${TheDirectory.user_name}&dir=${TheDirectory?.directory}`
  navigator.share({
    url: url,
  })
}

const descriptionPlace = ref("");

const savedes = async () => {
  if (FolderNow.value == null) { return }
  FolderNow.value.description = descriptionPlace.value;
  let res = await update_dir_information(ApiLink, FolderNow.value as Folder);
  if (res) {
    folderlist.value?.forEach(f => {
      if (f.id === FolderNow.value?.directory) {
        f = FolderNow.value
      }
    })
  }
  showWriteDes.value = false;
}

const WriteDes = () => {
  descriptionPlace.value = FolderNow.value?.description as string;
  showWriteDes.value = true;
}
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
            <button @click="showCreateDir = false">cancel</button>
          </div>
          <li class='privateFolderName' v-for="(folder, index) in folderlist"
            :class="{ focusFolder: IsFocus('folder', folder.directory), showfolder: FolderNow === folder }">
            <a @click.prevent="clickFolder(folder.directory, index)">{{ folder.directory }}</a>
          </li>
        </ul>
      </div>
      <div id="privateNote">
        <ul id="privateNoteList" v-if="notelist">
          <span>{{ FolderNow?.directory }}</span>
          <li @click="clickDi">目錄頁</li>
          <li class='privateNoteName' v-for="(note, index) in notelist" :class="{ focusFolder: IsFocus('note', note) }">
            <a @click.prevent="clickNote(note)">{{ note }}</a>
            <div v-if="ordering">
              <span @click="moveup(index)" v-show="index !== 0">↑</span>
              <span @click="movedown(index)" v-show="index !== notelist.length - 1">↓</span>
            </div>

          </li>
          <div id="crateFile" v-if="showCreateFile">
            <input v-model="inputFileName"></input>
            <button @click="createNote">create</button>
            <button @click="showCreateFile = false">cancel</button>
          </div>
          <li class="addNote">
            <a @click.prevent="showCreateFile = true">新增+</a>
          </li>
          <div v-show="!ordering">
            <button @click="ordering = true"></button>
          </div>
        </ul>
      </div>
      <div id="rightbuttonlist" v-show="FolderNow !== null">
        <button id="changeorder" @click="ordering = true" v-show="!ordering">調整順序</button>
        <button id="changeorder" @click="confirmOrder()" v-show="ordering">確認更改</button>
        <button id="deleteFolder" @click="delete_the_folder">刪除資料夾</button>
      </div>
    </div>
    <div id="privateFile" v-if="TheNote" :class="{ notshowNote: notShowNote }">
      <FilePage :theNote="TheNote" :theNoteNav="TheNav" v-if="TheNote" />
    </div>
    <div id="privateFolderPage" v-else-if="FolderNow && showFolder">
      <div id='public-file-first-header'>
        <div id="in-public-folder-name">{{ FolderNow.directory }}</div>
        <div id='public-folder-first-header-second-bar'>
          <div class='button-list'>
            <ShareIcon @click="sharefolder(FolderNow)" width="18px" class="sharebutton" />
          </div>
        </div>
      </div>
      <div id="in-public-folder-writer">{{ FolderNow.user_name }}</div>
      <div class="description">作品簡介</div>
      <div id="public-file-word-area-first-description" v-if="!showWriteDes">
        <pre>{{ FolderNow.description }}</pre>
        <br>
        <PenIcon width="16px" @click="WriteDes" />
      </div>
      <div id="write-description" v-if="showWriteDes">
        <textarea v-model="descriptionPlace" />
        <button @click="savedes">save</button>
      </div>
      <div class='catlog'>目錄</div>
      <div id="public-file-word-area-first-file-list">
        <ul id="public-file-list-ul">
          <li v-for="foldernotename in FolderNow.note_order">
            <a @click="clickNote(foldernotename)">{{ foldernotename }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
#privateFolderPage {
  width: 100%;
  margin: 5%;
}

textarea {
  margin: 10px;
  width: 100%;
  height: 500px;
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


#privateNoteList {
  padding-top: 40px;
}

#privateFolderList {
  padding-top: 60px;
}


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
}

ul span {
  color: var(--primary-color);
  font-weight: 700;
  font-size: 1.2rem;
}

.addNote a {
  padding-right: 10px;
  padding-left: 5px;
  padding-bottom: 5px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
}

.addNote {}

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

.privateNoteName {
  display: flex;
  gap: 5px;
}

#rightbuttonlist button {
  font-size: 16px;
  color: white;
  border-radius: 4px;
  padding: 5px;
  border: 1px white solid;
}

#rightbuttonlist {
  position: fixed;
  bottom: 0%;
  right: 0%;
  display: flex;
  gap: 10px;
  flex-direction: column;

}
</style>

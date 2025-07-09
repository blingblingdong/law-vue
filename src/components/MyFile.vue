<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import FilePage from './FilePage.vue'
import type { Folder } from '../types/Folder.ts'
import type { H2Nav, Note } from '../types/Note.ts'
import { get_every_note, get_note_list, get_note, get_note_nav, create_note, create_dir } from '../types/Note'
import { get_every_folders, get_folder, update_note_order, get_note_order, delete_folder } from '../types/Folder'
const folderlist = ref<null | Folder[]>(null);
import swal from 'sweetalert'
const ordering = ref(false);


import { getApiUrl } from '../utils/api'
import { useAccountStore } from '../store/page'

const ApiLink = getApiUrl();
const notelist = ref<null | string[]>(null);
const input = ref('');
const TheNote = ref<null | Note>(null)
const TheNav = ref<null | H2Nav[]>(null)
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

const confirmOrder = async () => {
  if (notelist && account.username) {
    let result = await update_note_order(ApiLink, account.username as string, FolderNow.value, notelist.value as string[]);
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
      await clickFolder(folderlist.value[focuson.value.position].directory)
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

const clickFolder = async (folder_name: string, index?: number) => {
  notelist.value = await get_note_order(ApiLink, account.username as string, folder_name);
  FolderNow.value = folder_name;
  if (index) {
    focuson.value.position = index;
  }
}

const clickNote = async (notename: string) => {
  TheNote.value = await get_note(ApiLink, account.username as string, FolderNow.value, notename);
  TheNav.value = await get_note_nav(ApiLink, `${account.username as string}-${FolderNow.value}-${notename}`);
  notShowNote.value = false;
  showsidebar.value = false;
}

const createNote = async () => {
  let id = account.username as string + "-" + FolderNow.value + "-" + inputFileName.value;
  let note: Note = { id: id, user_name: account.username as string, footer: null, content: null, file_name: inputFileName.value, directory: FolderNow.value, public: true };
  await create_note(ApiLink, note);
  await nextTick();
  notelist.value = await get_note_order(ApiLink, account.username as string, FolderNow.value);
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
    let res = await delete_folder(ApiLink, account.username as string, FolderNow.value);
    if (res) {
      swal("Deleted!", `${FolderNow} has been deleted!`, "success");
    } else {
      swal("Oops!", "Seems like we couldn't fetch the info", "error");
    }
  }

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
            :class="{ focusFolder: IsFocus('folder', folder.directory), showfolder: FolderNow === folder.directory }">
            <a @click.prevent="clickFolder(folder.directory, index)">{{ folder.directory }}</a>
          </li>
        </ul>
      </div>
      <div id="privateNote">
        <ul id="privateNoteList" v-if="notelist">
          <span>{{ FolderNow }}</span>
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
      <div id="rightbuttonlist" v-show="FolderNow !== ''">
        <button id="changeorder" @click="ordering = true" v-show="!ordering">調整順序</button>
        <button id="changeorder" @click="confirmOrder()" v-show="ordering">確認更改</button>
        <button id="deleteFolder" @click="delete_the_folder">刪除資料夾</button>
      </div>
    </div>
    <div id="privateFile" v-if="TheNote" :class="{ notshowNote: notShowNote }">
      <FilePage :theNote="TheNote" :theNoteNav="TheNav" v-if="TheNote" />
    </div>
  </div>
</template>

<style scoped>
#privateNoteList {}


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
  padding-top: 60%;
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
  position: absolute;
  bottom: 10%;
  right: 0%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>

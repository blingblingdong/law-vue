<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { type LibraryItem, type Library, create_Library, create_Library_item, get_library, get_library_item } from '../types/Libray.ts'

import { getApiUrl } from '../utils/api.ts'
import { useAccountStore } from '../store/page.ts'
const ApiLink = getApiUrl();

const LibraryVec = ref<null | Library[]>(null)
import swal from 'sweetalert'


const props = defineProps<{
  itemName: string;
  itemType: string;
  itemId: string;
}>();



onMounted(async () => {
  let res = await get_library(ApiLink, account.username as string);
  if (res) {
    LibraryVec.value = res;
  }
})


const if_add_lib = ref(false);
const addlibname = ref("");

const add_lib = async () => {
  swal("Are you sure you want to do this?", {
    buttons: [false, true],
  }).then(async (val) => {
    if (val) {
      let res = await create_Library(ApiLink, addlibname.value, account.username as string);
      if (res) {
        swal({
          title: "Success!",
          text: "Library added!",
        });
        let res = await get_library(ApiLink, account.username as string);
        if (res) {
          LibraryVec.value = res;
        }
      } else {
        swal({
          title: "Error!",
          text: "Some Error Happen!",
        });
      }
    }
  });
  if_add_lib.value = false;
}

const showpopup = ref(true);
const account = useAccountStore();
const checkedLibs = ref<string[]>([])

const addToLib = async () => {
  if (checkedLibs.value.length == 0) { return }
  checkedLibs.value.forEach(async itemid => {
    let res = await create_Library_item(ApiLink, itemid, props.itemId, props.itemType, props.itemName);
    if (res) {
      swal("成功加入!");
    } else {
      swal("失敗...")
    }
  })
}
</script>



<template>
  <div class="popup">
    <div class="popup-content">
      <h3>將{{ itemName }}加入...</h3>
      <div v-for="lib in LibraryVec" class="libchoosebox" v-if="LibraryVec">
        <input type="checkbox" :value="lib.id" v-model="checkedLibs">
        <label>{{ lib.library_name }}</label>
      </div>
      <div @click="if_add_lib = true" v-show="!if_add_lib">
        + add Library
      </div>
      <div class="inputlib" v-if="if_add_lib">
        <input v-model="addlibname"></input>
        <div style="display:flex;gap:10px;">
          <p @click="add_lib">create</p>
          <p @click="if_add_lib = false">cacel</p>
        </div>
      </div>
      <p @click="addToLib">confirm</p>
      <p @click="showpopup = false">close</p>
    </div>
  </div>
</template>

<style scoped>
.popup {
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #00000090;
  z-index: 99;
  justify-content: center;
  align-items: center;

}



@media only screen and (max-width: 600px) {
  .notshowNote {
    display: none !important;
  }

  #privateFolderAndNote {
    display: flex;
    gap: 50px;
    flex: 100%;
  }

}
</style>

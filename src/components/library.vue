<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { type LibraryItem, type Library, create_Library, create_Library_item, get_library, get_library_item } from '../types/Libray.ts'

import { getApiUrl } from '../utils/api.ts'
import { useAccountStore } from '../store/page.ts'
import LibPopup from './LibPopup.vue'
import LibPage from './LibPage.vue'
const ApiLink = getApiUrl();

const LibraryVec = ref<null | Library[]>(null)

const account = useAccountStore();
import swal from 'sweetalert'




onMounted(async () => {
  let res = await get_library(ApiLink, account.username as string);
  if (res) {
    LibraryVec.value = res;
  }
})

watch(
  () => account.username,
  async (name) => {
    let res = await get_library(ApiLink, name as string);
    if (res) {
      LibraryVec.value = res;
    }
  }
)

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


const nowLib = ref<Library | null>(null);
</script>



<template>
  <div>
    <div class="libnav" @click="nowLib = null">
      Home
    </div>
    <div class="libcards" v-show="!nowLib">
      <div v-for="lib in LibraryVec" class="libcard" v-if="LibraryVec" @click="nowLib = lib">
        {{ lib.library_name }}
      </div>
      <div class="addlib" @click="if_add_lib = true" v-show="!if_add_lib">
        add Library
      </div>
      <div class="inputlib" v-if="if_add_lib">
        <input v-model="addlibname"></input>
        <p @click="add_lib">create</p>
      </div>
    </div>
    <div class="LibPage" v-if="nowLib">
      <LibPage :LibName="nowLib.library_name" :LibId="nowLib.id" />
    </div>
  </div>
</template>

<style scoped>
.libcards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-top: 100px;
}

.libcard:before {
  content: "\f07b";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #ff9300;
  font-size: 40px;
  margin-bottom: 5px;
}

.libcard,
.addlib {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100px;
}

.addlib:before {
  content: "\f65e";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #ff9300;
  font-size: 40px;
  margin-bottom: 5px;
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

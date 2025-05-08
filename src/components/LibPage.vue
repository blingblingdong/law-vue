<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { type LibraryItem, type Library, create_Library, create_Library_item, get_library, get_library_item } from '../types/Libray.ts'

import { getApiUrl } from '../utils/api.ts'
import { type WorkingItem, finditem, type othersourceitem } from '../types/otherlawsource'
import { useAccountStore } from '../store/page.ts'

import swal from 'sweetalert'
import LibPopup from './LibPopup.vue'
const ApiLink = getApiUrl();

const LibraryVec = ref<null | Library[]>(null)

const props = defineProps<{
  LibName: string,
  LibId: string
}>();

const LibItems = ref<LibraryItem[]>([])
const TheWorkingItem = ref<WorkingItem[]>([])


/*
watch(
  () => props.LibId,
  async (libid) => {
    let res = await get_library_item(ApiLink, libid);
    if (!res) {
      window.swal("Some mistake happen!");
      return
    }
    LibItems.value = res;
  }
)
*/

const clickitem = async (libitem: LibraryItem) => {
  let item: othersourceitem = { id: libitem.id, name: libitem.item_name, sourcetype: libitem.item_type };
  let res = await finditem(ApiLink, item);
  if (res) {
    TheWorkingItem.value.push(res);
  } else {
    swal("出現錯誤")
  }
}

onMounted(async () => {
  let res = await get_library_item(ApiLink, props.LibId);
  if (!res) {
    swal("Some mistake happen!");
    return
  }
  LibItems.value = res;
})



const account = useAccountStore();
const nowitemid = ref("xxx");
</script>



<template>
  <h2>{{ LibName }}</h2>
  <div v-for="LibItem in LibItems" @click="clickitem(LibItem)">
    {{ LibItem.item_name }}
  </div>
  <div v-if="TheWorkingItem">
    <div v-for="(item, index) in TheWorkingItem" v-show="item.item.id === nowitemid">
      <component :is="item.con" v-bind="item.data" :id="index" />
    </div>
    <div id="below-nav">
      {{ nowitemid }}
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

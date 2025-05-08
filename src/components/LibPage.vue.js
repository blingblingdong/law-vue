import { ref, onMounted, nextTick, watch } from 'vue';
import { create_Library, create_Library_item, get_library, get_library_item } from '../types/Libray.ts';
import { getApiUrl } from '../utils/api.ts';
import { finditem } from '../types/otherlawsource';
import { useAccountStore } from '../store/page.ts';
import LibPopup from './LibPopup.vue';
const ApiLink = getApiUrl();
const LibraryVec = ref(null);
const props = defineProps();
const LibItems = ref([]);
const TheWorkingItem = ref([]);
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
const clickitem = async (libitem) => {
    let item = { id: libitem.id, name: libitem.item_name, sourcetype: libitem.item_type };
    let res = await finditem(ApiLink, item);
    if (res) {
        TheWorkingItem.value.push(res);
    }
    else {
        window.swal("出現錯誤");
    }
};
onMounted(async () => {
    let res = await get_library_item(ApiLink, props.LibId);
    if (!res) {
        window.swal("Some mistake happen!");
        return;
    }
    LibItems.value = res;
});
const account = useAccountStore();
const nowitemid = ref("xxx");
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['libcard']} */ ;
/** @type {__VLS_StyleScopedClasses['addlib']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.LibName);
for (const [LibItem] of __VLS_getVForSourceType((__VLS_ctx.LibItems))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.clickitem(LibItem);
            } },
    });
    (LibItem.item_name);
}
if (__VLS_ctx.TheWorkingItem) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.TheWorkingItem))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (item.item.id === __VLS_ctx.nowitemid) }, null, null);
        const __VLS_0 = ((item.con));
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            ...(item.data),
            id: (index),
        }));
        const __VLS_2 = __VLS_1({
            ...(item.data),
            id: (index),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "below-nav",
    });
    (__VLS_ctx.nowitemid);
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LibItems: LibItems,
            TheWorkingItem: TheWorkingItem,
            clickitem: clickitem,
            nowitemid: nowitemid,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */

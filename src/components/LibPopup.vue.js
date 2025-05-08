import { ref, onMounted, nextTick, watch } from 'vue';
import { create_Library, create_Library_item, get_library, get_library_item } from '../types/Libray.ts';
import { getApiUrl } from '../utils/api.ts';
import { useAccountStore } from '../store/page.ts';
const ApiLink = getApiUrl();
const LibraryVec = ref(null);
const props = defineProps();
onMounted(async () => {
    let res = await get_library(ApiLink, account.username);
    if (res) {
        LibraryVec.value = res;
    }
});
const if_add_lib = ref(false);
const addlibname = ref("");
const add_lib = async () => {
    window.swal("Are you sure you want to do this?", {
        buttons: [false, true],
    }).then(async (val) => {
        if (val) {
            let res = await create_Library(ApiLink, addlibname.value, account.username);
            if (res) {
                window.swal({
                    title: "Success!",
                    text: "Library added!",
                });
                let res = await get_library(ApiLink, account.username);
                if (res) {
                    LibraryVec.value = res;
                }
            }
            else {
                window.swal({
                    title: "Error!",
                    text: "Some Error Happen!",
                });
            }
        }
    });
    if_add_lib.value = false;
};
const showpopup = ref(true);
const account = useAccountStore();
const checkedLibs = ref([]);
const addToLib = async () => {
    if (checkedLibs.value.length == 0) {
        return;
    }
    checkedLibs.value.forEach(async (itemid) => {
        let res = await create_Library_item(ApiLink, itemid, props.itemId, props.itemType, props.itemName);
        if (res) {
            window.swal("成功加入!");
        }
        else {
            window.swal("失敗...");
        }
    });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "popup" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "popup-content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.itemName);
if (__VLS_ctx.LibraryVec) {
    for (const [lib] of __VLS_getVForSourceType((__VLS_ctx.LibraryVec))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "libchoosebox" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
            type: "checkbox",
            value: (lib.id),
        });
        (__VLS_ctx.checkedLibs);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        (lib.library_name);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.if_add_lib = true;
        } },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.if_add_lib) }, null, null);
if (__VLS_ctx.if_add_lib) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "inputlib" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({});
    (__VLS_ctx.addlibname);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ onClick: (__VLS_ctx.add_lib) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.if_add_lib))
                    return;
                __VLS_ctx.if_add_lib = false;
            } },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ onClick: (__VLS_ctx.addToLib) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showpopup = false;
        } },
});
/** @type {__VLS_StyleScopedClasses['popup']} */ ;
/** @type {__VLS_StyleScopedClasses['popup-content']} */ ;
/** @type {__VLS_StyleScopedClasses['libchoosebox']} */ ;
/** @type {__VLS_StyleScopedClasses['inputlib']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LibraryVec: LibraryVec,
            if_add_lib: if_add_lib,
            addlibname: addlibname,
            add_lib: add_lib,
            showpopup: showpopup,
            checkedLibs: checkedLibs,
            addToLib: addToLib,
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

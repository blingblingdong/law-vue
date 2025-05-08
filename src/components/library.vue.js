import { ref, onMounted, nextTick, watch } from 'vue';
import { create_Library, create_Library_item, get_library, get_library_item } from '../types/Libray.ts';
import { getApiUrl } from '../utils/api.ts';
import { useAccountStore } from '../store/page.ts';
import LibPopup from './LibPopup.vue';
import LibPage from './LibPage.vue';
const ApiLink = getApiUrl();
const LibraryVec = ref(null);
const account = useAccountStore();
onMounted(async () => {
    let res = await get_library(ApiLink, account.username);
    if (res) {
        LibraryVec.value = res;
    }
});
watch(() => account.username, async (name) => {
    let res = await get_library(ApiLink, name);
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
const nowLib = ref(null);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['libcard']} */ ;
/** @type {__VLS_StyleScopedClasses['addlib']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.nowLib = null;
        } },
    ...{ class: "libnav" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "libcards" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.nowLib) }, null, null);
if (__VLS_ctx.LibraryVec) {
    for (const [lib] of __VLS_getVForSourceType((__VLS_ctx.LibraryVec))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.LibraryVec))
                        return;
                    __VLS_ctx.nowLib = lib;
                } },
            ...{ class: "libcard" },
        });
        (lib.library_name);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.if_add_lib = true;
        } },
    ...{ class: "addlib" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.if_add_lib) }, null, null);
if (__VLS_ctx.if_add_lib) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "inputlib" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({});
    (__VLS_ctx.addlibname);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ onClick: (__VLS_ctx.add_lib) },
    });
}
if (__VLS_ctx.nowLib) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "LibPage" },
    });
    /** @type {[typeof LibPage, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(LibPage, new LibPage({
        LibName: (__VLS_ctx.nowLib.library_name),
        LibId: (__VLS_ctx.nowLib.id),
    }));
    const __VLS_1 = __VLS_0({
        LibName: (__VLS_ctx.nowLib.library_name),
        LibId: (__VLS_ctx.nowLib.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
/** @type {__VLS_StyleScopedClasses['libnav']} */ ;
/** @type {__VLS_StyleScopedClasses['libcards']} */ ;
/** @type {__VLS_StyleScopedClasses['libcard']} */ ;
/** @type {__VLS_StyleScopedClasses['addlib']} */ ;
/** @type {__VLS_StyleScopedClasses['inputlib']} */ ;
/** @type {__VLS_StyleScopedClasses['LibPage']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LibPage: LibPage,
            LibraryVec: LibraryVec,
            if_add_lib: if_add_lib,
            addlibname: addlibname,
            add_lib: add_lib,
            nowLib: nowLib,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

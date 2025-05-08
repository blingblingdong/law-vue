import { ref, computed } from 'vue';
import { loadLaw, useProcessedLines } from '../../types/Law.ts';
const ApiLink = "http://localhost:8080";
const lines = ref([]);
const lines_show = ref(false);
const NowPage = ref('All');
const PageList = ref([
    { page: "All", isActive: true }, { page: "Chapter", isActive: false }, { page: "Text", isActive: false }, { page: "About", isActive: false }
]);
const HandlePage = function (pageObj) {
    PageList.value.forEach(item => {
        item.isActive = (item.page === pageObj.page);
    });
    NowPage.value = pageObj.page;
};
const { processedLines } = useProcessedLines(lines);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "test-area",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "law-search-area",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    id: "law-search-area-form",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    list: "law-name-data",
    id: "search-chapter",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "reset",
    id: "reset",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "law-search-area-nav" },
});
for (const [pageObj] of __VLS_getVForSourceType((__VLS_ctx.PageList))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.HandlePage(pageObj);
            } },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        ...{ class: ({ active: pageObj.isActive }) },
    });
    (pageObj.page);
}
if (__VLS_ctx.NowPage === 'All') {
    const __VLS_0 = {}.AllLines;
    /** @type {[typeof __VLS_components.AllLines, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
else if (__VLS_ctx.NowPage === 'Chapter') {
    const __VLS_4 = {}.Chapter;
    /** @type {[typeof __VLS_components.Chapter, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({}));
    const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
}
else if (__VLS_ctx.NowPage === 'Text') {
    const __VLS_8 = {}.Text;
    /** @type {[typeof __VLS_components.Text, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
    const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
}
else if (__VLS_ctx.NowPage === 'About') {
    const __VLS_12 = {}.About;
    /** @type {[typeof __VLS_components.About, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
}
/** @type {__VLS_StyleScopedClasses['law-search-area-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            NowPage: NowPage,
            PageList: PageList,
            HandlePage: HandlePage,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

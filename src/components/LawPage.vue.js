import { ref, onMounted } from 'vue';
import AllLines from "./LawPageCon/AllLines.vue";
import Text from "./LawPageCon/Text.vue";
import Chapter from "./LawPageCon/Chapter.vue";
import Num from "./LawPageCon/Num.vue";
import { get_all_lawList, getChapterList, load_chapter_datalist } from '../types/Law.ts';
import { getApiUrl } from '../utils/api.ts';
const ApiLink = getApiUrl();
const NowPage = ref('All');
const chapterlist = ref(null);
const chapterOption = ref("");
const data = ref(null);
const props = defineProps();
onMounted(async () => {
    data.value = await get_all_lawList(props.chapter, ApiLink);
    chapterlist.value = await getChapterList(props.chapter, ApiLink);
    chapterOption.value = await load_chapter_datalist(props.chapter, ApiLink);
});
const HandlePage = function (page) {
    NowPage.value = page;
};
const pagelist = ["All", "Chapter", "Text", "Num"];
import LibPopup from './LibPopup.vue';
const showPopup = ref(false);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['law-search-area-form-send']} */ ;
/** @type {__VLS_StyleScopedClasses['law-search-area-form-send']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "test-area",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showPopup = true;
        } },
    ...{ class: "fa-solid fa-bookmark" },
});
/** @type {[typeof LibPopup, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(LibPopup, new LibPopup({
    itemId: (__VLS_ctx.chapter),
    itemType: ('lawname'),
    itemName: (__VLS_ctx.chapter),
}));
const __VLS_1 = __VLS_0({
    itemId: (__VLS_ctx.chapter),
    itemType: ('lawname'),
    itemName: (__VLS_ctx.chapter),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showPopup) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showPopup = false;
        } },
    ...{ class: "fa-solid fa-xmark" },
    id: "closePopup",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showPopup) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "law-search-area-nav" },
});
for (const [page] of __VLS_getVForSourceType((__VLS_ctx.pagelist))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.HandlePage(page);
            } },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        ...{ class: ({ active: __VLS_ctx.NowPage === page }) },
    });
    (page);
}
/** @type {[typeof AllLines, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(AllLines, new AllLines({
    chapter: (__VLS_ctx.chapter),
    LawLists: (__VLS_ctx.data),
    UlLists: (__VLS_ctx.chapterlist),
}));
const __VLS_4 = __VLS_3({
    chapter: (__VLS_ctx.chapter),
    LawLists: (__VLS_ctx.data),
    UlLists: (__VLS_ctx.chapterlist),
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.NowPage === 'All') }, null, null);
/** @type {[typeof Chapter, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(Chapter, new Chapter({
    chapter: (__VLS_ctx.chapter),
    ChapterOption: (__VLS_ctx.chapterOption),
    ullist: (__VLS_ctx.chapterlist),
}));
const __VLS_7 = __VLS_6({
    chapter: (__VLS_ctx.chapter),
    ChapterOption: (__VLS_ctx.chapterOption),
    ullist: (__VLS_ctx.chapterlist),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.NowPage === 'Chapter') }, null, null);
/** @type {[typeof Text, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(Text, new Text({
    LawLists: (__VLS_ctx.data),
}));
const __VLS_10 = __VLS_9({
    LawLists: (__VLS_ctx.data),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.NowPage === 'Text') }, null, null);
/** @type {[typeof Num, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(Num, new Num({
    chpater: (__VLS_ctx.chapter),
}));
const __VLS_13 = __VLS_12({
    chpater: (__VLS_ctx.chapter),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.NowPage === 'Num') }, null, null);
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-bookmark']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-xmark']} */ ;
/** @type {__VLS_StyleScopedClasses['law-search-area-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            AllLines: AllLines,
            Text: Text,
            Chapter: Chapter,
            Num: Num,
            NowPage: NowPage,
            chapterlist: chapterlist,
            chapterOption: chapterOption,
            data: data,
            HandlePage: HandlePage,
            pagelist: pagelist,
            LibPopup: LibPopup,
            showPopup: showPopup,
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

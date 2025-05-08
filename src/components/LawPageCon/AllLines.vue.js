import { onMounted, ref, watch, onUnmounted } from 'vue';
import PrintChapter from '././PrintChapter.vue';
import { to_history_link } from '../../types/Law';
const props = defineProps();
const num = ref('');
const searchChapter = ref('');
const text = ref('');
const lawlines = function (lines) {
    let buffer = "";
    lines.forEach(line => {
        let content_buffer = "";
        if (line.content.includes(text.value)) {
            content_buffer = line.content.replace(text.value, `<span class="highlight">${text.value}</span>`);
        }
        else {
            content_buffer = line.content;
        }
        if (line.line_type === 'indent') {
            buffer = buffer + `<div class=law-indent>${content_buffer}</div>`;
        }
        else {
            buffer = buffer + `<li class="law-line">${content_buffer}</li>`;
        }
    });
    return buffer;
};
const IsSearching = function (lawnumber) {
    if (num.value === "") {
        return true;
    }
    if (num.value === lawnumber) {
        return true;
    }
    return false;
};
const IsSearchingText = function (lines) {
    let bool = false;
    if (text.value === "") {
        bool = true;
    }
    lines.forEach(s => {
        if (s.content.includes(text.value)) {
            bool = true;
        }
    });
    return bool;
};
const showchapter = (l) => {
    alert(l.href);
};
// 假設 entertext 與 bar 都是 data 中的變數
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['law-block-line']} */ ;
/** @type {__VLS_StyleScopedClasses['lawToolBar']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.LawLists && __VLS_ctx.LawLists.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "all-lines-area",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "all-lines",
    });
    for (const [LawListObj] of __VLS_getVForSourceType((__VLS_ctx.LawLists))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        for (const [c] of __VLS_getVForSourceType((LawListObj.chapter))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                id: (c),
                ...{ class: "alllineschapter" },
                ...{ class: ({ searchingChapter: c === __VLS_ctx.searchChapter }) },
            });
            __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.text === '' && __VLS_ctx.num === '') }, null, null);
            (c);
        }
        for (const [law] of __VLS_getVForSourceType((LawListObj.laws))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "law-card" },
                id: (__VLS_ctx.chapter + law.num),
            });
            __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.IsSearching(law.num) && __VLS_ctx.IsSearchingText(law.lines)) }, null, null);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "law-card-title" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                ...{ class: ({ searchingNum: law.num === __VLS_ctx.num }) },
            });
            (law.num);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.LawLists && __VLS_ctx.LawLists.length > 0))
                            return;
                        __VLS_ctx.showchapter(law);
                    } },
            });
            __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.text !== '' || __VLS_ctx.num !== '') }, null, null);
            (law.chapter.join(" > "));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "lawToolBar" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                href: (__VLS_ctx.to_history_link(__VLS_ctx.chapter, law.num)),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                href: ('https://law.moj.gov.tw/LawClass/' + law.href),
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: 'law-block-lines' },
            });
            if (__VLS_ctx.text === '') {
                for (const [line] of __VLS_getVForSourceType((law.lines))) {
                    if (line.line_type === 'indent') {
                        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                            ...{ class: "law-indent" },
                        });
                        (line.content);
                    }
                    else {
                        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                            ...{ class: "law-block-line" },
                        });
                        (line.content);
                    }
                }
            }
            else {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.lawlines(law.lines)) }, null, null);
            }
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "all-chapter",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "realchapter",
    });
    if (__VLS_ctx.UlLists) {
        /** @type {[typeof PrintChapter, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(PrintChapter, new PrintChapter({
            ullist: (__VLS_ctx.UlLists),
            chapter: (__VLS_ctx.chapter),
        }));
        const __VLS_1 = __VLS_0({
            ullist: (__VLS_ctx.UlLists),
            chapter: (__VLS_ctx.chapter),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "searchbar",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "searchbar-num",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({});
    (__VLS_ctx.searchChapter);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: ('#' + __VLS_ctx.searchChapter),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "searchbar-chapter",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({});
    (__VLS_ctx.num);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "searchbar-text",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({});
    (__VLS_ctx.text);
}
/** @type {__VLS_StyleScopedClasses['alllineschapter']} */ ;
/** @type {__VLS_StyleScopedClasses['searchingChapter']} */ ;
/** @type {__VLS_StyleScopedClasses['law-card']} */ ;
/** @type {__VLS_StyleScopedClasses['law-card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['searchingNum']} */ ;
/** @type {__VLS_StyleScopedClasses['lawToolBar']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-lines']} */ ;
/** @type {__VLS_StyleScopedClasses['law-indent']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-line']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            PrintChapter: PrintChapter,
            to_history_link: to_history_link,
            num: num,
            searchChapter: searchChapter,
            text: text,
            lawlines: lawlines,
            IsSearching: IsSearching,
            IsSearchingText: IsSearchingText,
            showchapter: showchapter,
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

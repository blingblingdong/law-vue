import { ref, computed } from 'vue';
import { loadLaw, useProcessedLines } from '../types/Law.ts';
const lawName = ref('');
const lawNum = ref('');
import { getApiUrl } from '../utils/api.ts';
const ApiLink = getApiUrl();
const lines = ref([]);
const lines_show = ref(false);
const fastSearch = async (event) => {
    if (lawName.value !== "" && lawNum.value !== "") {
        const law = await loadLaw(lawName.value, lawNum.value, ApiLink);
        if (law) {
            lines.value = law.lines;
            lines_show.value = true;
        }
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['law-block-line']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-bar-item']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-lines']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "search-area",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "search-law-form",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: 'chapter-input-wrapper',
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onInput: (__VLS_ctx.fastSearch) },
    list: "law-name-data",
    id: "chapter",
    placeholder: "XX法",
});
(__VLS_ctx.lawName);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: 'num-input-wrapper',
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onInput: (__VLS_ctx.fastSearch) },
    id: 'num',
    placeholder: "條目",
});
(__VLS_ctx.lawNum);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: 'fast-search-result',
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: 'result-area',
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: 'law-block-lines' },
});
for (const [line] of __VLS_getVForSourceType((__VLS_ctx.lines))) {
    if (line.line_type === 'indent') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "law-indent" },
        });
        (line.content);
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "law-block-line line-0000 show-number" },
        });
        (line.content);
    }
}
if (__VLS_ctx.lines_show) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: 'fast-search-tool-bar',
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: 'tool-bar-item' },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: "fa-solid fa-book" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: 'tool-bar-item' },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: "fa-solid fa-bookmark" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: 'tool-bar-item' },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: "fa-solid fa-pen" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: 'tool-bar-item' },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: "fa-solid fa-asterisk" },
    });
}
/** @type {__VLS_StyleScopedClasses['law-block-lines']} */ ;
/** @type {__VLS_StyleScopedClasses['law-indent']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-line']} */ ;
/** @type {__VLS_StyleScopedClasses['line-0000']} */ ;
/** @type {__VLS_StyleScopedClasses['show-number']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-bar-item']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-book']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-bar-item']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-bookmark']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-bar-item']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-pen']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-bar-item']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-asterisk']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            lawName: lawName,
            lawNum: lawNum,
            lines: lines,
            lines_show: lines_show,
            fastSearch: fastSearch,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

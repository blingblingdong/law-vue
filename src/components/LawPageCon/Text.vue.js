import { ref, computed } from 'vue';
const props = defineProps();
const text = ref('');
const IsSearchingText = function (lines) {
    let bool = false;
    lines.forEach(line => {
        if (line.content.includes(text.value)) {
            bool = true;
        }
    });
    return bool;
};
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
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['law-block-line']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "searchTextArea",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    id: "searchTextInput",
});
(__VLS_ctx.text);
for (const [LawListObj] of __VLS_getVForSourceType((__VLS_ctx.LawLists))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "lawlist",
    });
    for (const [law] of __VLS_getVForSourceType((LawListObj.laws))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "law-card" },
            id: (law.chapter[0] + law.num),
        });
        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.IsSearchingText(law.lines) && __VLS_ctx.text !== '') }, null, null);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "law-card-title" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (law.num);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.text !== '') }, null, null);
        (law.chapter.join(" > "));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
            ...{ class: 'law-block-lines' },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.lawlines(law.lines)) }, null, null);
    }
}
/** @type {__VLS_StyleScopedClasses['law-card']} */ ;
/** @type {__VLS_StyleScopedClasses['law-card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-lines']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            text: text,
            IsSearchingText: IsSearchingText,
            lawlines: lawlines,
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

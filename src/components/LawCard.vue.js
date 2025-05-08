import { defineProps, ref, onMounted } from 'vue';
import {} from '../types/Law';
const showLines = ref(false);
const props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['law-block-line']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "law-card-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.law.chapter[0]);
(__VLS_ctx.law.num);
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showLines = true;
        } },
    ...{ class: "fa-solid fa-eye" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.showLines) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showLines = false;
        } },
    ...{ class: "fa-solid fa-eye-slash" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showLines) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: 'law-block-lines' },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showLines) }, null, null);
for (const [line] of __VLS_getVForSourceType((__VLS_ctx.law.lines))) {
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
/** @type {__VLS_StyleScopedClasses['law-card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-eye']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-eye-slash']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-lines']} */ ;
/** @type {__VLS_StyleScopedClasses['law-indent']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-line']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            showLines: showLines,
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

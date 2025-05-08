import { defineProps } from 'vue';
const props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    id: (__VLS_ctx.block.attributes?.id),
    ...{ class: (__VLS_ctx.block.attributes?.class) },
    ...{ style: (__VLS_ctx.block.attributes?.style) },
});
for (const [child, index] of __VLS_getVForSourceType((__VLS_ctx.block.children))) {
    (index);
    if (child.type === 'text') {
        (child.text);
    }
    else if (child.type === 'span') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: (child.attributes?.class) },
            ...{ style: (child.attributes?.style) },
        });
        (child.text);
    }
    else if (child.type === 'strong') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({
            ...{ class: (child.attributes?.class) },
            ...{ style: (child.attributes?.style) },
        });
        (child.text);
    }
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
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

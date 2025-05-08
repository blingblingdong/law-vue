import { defineProps } from 'vue';
const props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.figure, __VLS_intrinsicElements.figure)({
    id: (__VLS_ctx.block.attributes?.id),
    ...{ class: (__VLS_ctx.block.attributes?.class) },
    ...{ style: (__VLS_ctx.block.attributes?.style) },
});
for (const [child, index] of __VLS_getVForSourceType((__VLS_ctx.block.children))) {
    (index);
    if (child.type === 'img') {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
            ...{ class: (child.attributes?.class) },
            ...{ style: (child.attributes?.style) },
            src: (child.attributes?.src),
            width: (child.attributes?.width),
            id: (child.attributes?.id),
            height: (child.attributes?.height),
        });
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

import { defineProps } from 'vue';
import InlineNodeTemplate from './InlineNodeTemplate.vue';
const props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    id: (__VLS_ctx.block.attributes?.id),
    ...{ class: (__VLS_ctx.block.attributes?.class) },
    ...{ style: (__VLS_ctx.block.attributes?.style) },
});
if (__VLS_ctx.block.children) {
    for (const [child] of __VLS_getVForSourceType((__VLS_ctx.block.children))) {
        /** @type {[typeof InlineNodeTemplate, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(InlineNodeTemplate, new InlineNodeTemplate({
            inlineNode: (child),
        }));
        const __VLS_1 = __VLS_0({
            inlineNode: (child),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            InlineNodeTemplate: InlineNodeTemplate,
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

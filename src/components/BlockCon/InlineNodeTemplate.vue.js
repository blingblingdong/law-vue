import { defineProps } from 'vue';
const props = defineProps();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.inlineNode.type === 'text') {
    (__VLS_ctx.inlineNode.text);
}
else if (__VLS_ctx.inlineNode.type === 'span') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: (__VLS_ctx.inlineNode.attributes?.class) },
        ...{ style: (__VLS_ctx.inlineNode.attributes?.style) },
    });
    (__VLS_ctx.inlineNode.text);
    if (__VLS_ctx.inlineNode.children) {
        for (const [nested, idx] of __VLS_getVForSourceType((__VLS_ctx.inlineNode.children))) {
            const __VLS_0 = {}.InlineNodeTemplate;
            /** @type {[typeof __VLS_components.InlineNodeTemplate, ]} */ ;
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
                inlineNode: (nested),
            }));
            const __VLS_2 = __VLS_1({
                inlineNode: (nested),
            }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        }
    }
}
else if (__VLS_ctx.inlineNode.type === 'strong') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({
        ...{ class: (__VLS_ctx.inlineNode.attributes?.class) },
        ...{ style: (__VLS_ctx.inlineNode.attributes?.style) },
    });
    (__VLS_ctx.inlineNode.text);
    if (__VLS_ctx.inlineNode.children) {
        for (const [nested, idx] of __VLS_getVForSourceType((__VLS_ctx.inlineNode.children))) {
            const __VLS_4 = {}.InlineNodeTemplate;
            /** @type {[typeof __VLS_components.InlineNodeTemplate, ]} */ ;
            // @ts-ignore
            const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
                inlineNode: (nested),
            }));
            const __VLS_6 = __VLS_5({
                inlineNode: (nested),
            }, ...__VLS_functionalComponentArgsRest(__VLS_5));
        }
    }
}
else if (__VLS_ctx.inlineNode.type === 'p') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: (__VLS_ctx.inlineNode.attributes?.class) },
        ...{ style: (__VLS_ctx.inlineNode.attributes?.style) },
    });
    (__VLS_ctx.inlineNode.text);
    if (__VLS_ctx.inlineNode.children) {
        for (const [nested, idx] of __VLS_getVForSourceType((__VLS_ctx.inlineNode.children))) {
            const __VLS_8 = {}.InlineNodeTemplate;
            /** @type {[typeof __VLS_components.InlineNodeTemplate, ]} */ ;
            // @ts-ignore
            const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
                inlineNode: (nested),
            }));
            const __VLS_10 = __VLS_9({
                inlineNode: (nested),
            }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        }
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

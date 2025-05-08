import { ref, computed, watch } from 'vue';
import { loadLaw, to_history_link } from '../../types/Law.ts';
const props = defineProps();
const num = ref("");
const thelaw = ref(null);
import { getApiUrl } from '../../utils/api.ts';
const ApiLink = getApiUrl();
watch(() => num.value, async (number) => {
    thelaw.value = await loadLaw(props.chpater, number, ApiLink);
});
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
(__VLS_ctx.num);
if (__VLS_ctx.thelaw) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "law-card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "law-card-title" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.thelaw.num);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.thelaw.chapter.join(" > "));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "lawToolBar" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: (__VLS_ctx.to_history_link(__VLS_ctx.thelaw.chapter[0], __VLS_ctx.thelaw.num)),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: ('https://law.moj.gov.tw/LawClass/' + __VLS_ctx.thelaw.href),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: 'law-block-lines' },
    });
    for (const [line] of __VLS_getVForSourceType((__VLS_ctx.thelaw.lines))) {
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
/** @type {__VLS_StyleScopedClasses['law-card']} */ ;
/** @type {__VLS_StyleScopedClasses['law-card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['lawToolBar']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-lines']} */ ;
/** @type {__VLS_StyleScopedClasses['law-indent']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-line']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            to_history_link: to_history_link,
            num: num,
            thelaw: thelaw,
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

import { defineProps, ref, onMounted } from 'vue';
import InlineNodeTemplate from './InlineNodeTemplate.vue';
import { to_history_link, getHistoryLaw } from '../../types/Law.ts';
import { useUiStore } from '../../store/page.ts';
const ui = useUiStore();
import { getApiUrl } from '../../utils/api.ts';
const ApiLink = getApiUrl();
const lawnotecontent = ref("<p>ggh</p>");
const historylawvec = ref([]);
const showhistorylaw = ref(false);
const clickhistorylaw = async () => {
    showhistorylaw.value ? showhistorylaw.value = false : showhistorylaw.value = true;
    if (showhistorylaw.value) {
        const id = `${props.block.data?.chapter}-${props.block.data?.num}`;
        const res = await getHistoryLaw(ApiLink, id);
        if (res && res.length != 0) {
            historylawvec.value = res;
        }
        else {
            window.swal("抱歉，網頁還未寫入本法的歷史紀錄");
            showhistorylaw.value = false;
        }
    }
};
const showLines = ref(true);
const card = ref();
const props = defineProps();
if (props.block.data) {
    card.value = props.block.data;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['tool-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-line']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-chapter']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-lines']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.card) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "law-block" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "law-block-content-multiple" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "law-block-chapter-num" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.card))
                    return;
                __VLS_ctx.ui.goToLawPage(__VLS_ctx.card.chapter);
            } },
        ...{ class: "law-block-chapter" },
    });
    (__VLS_ctx.card.chapter);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "law-block-num" },
    });
    (__VLS_ctx.card.num);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tool-bar" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.card))
                    return;
                __VLS_ctx.showLines = true;
            } },
        ...{ class: "fa-solid fa-eye" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.showLines) }, null, null);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.card))
                    return;
                __VLS_ctx.showLines = false;
            } },
        ...{ class: "fa-solid fa-eye-slash" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showLines) }, null, null);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ onClick: (__VLS_ctx.clickhistorylaw) },
        ...{ class: "fa-solid fa-clock-rotate-left" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: 'law-block-lines' },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showLines) }, null, null);
    for (const [line] of __VLS_getVForSourceType((__VLS_ctx.card.lines))) {
        if (line.line_type === 'indent') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: (line.attributes?.class) },
                ...{ style: (line.attributes?.style) },
            });
            if (line.children) {
                for (const [child] of __VLS_getVForSourceType((line.children))) {
                    /** @type {[typeof InlineNodeTemplate, ]} */ ;
                    // @ts-ignore
                    const __VLS_0 = __VLS_asFunctionalComponent(InlineNodeTemplate, new InlineNodeTemplate({
                        inlineNode: child,
                    }));
                    const __VLS_1 = __VLS_0({
                        inlineNode: child,
                    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
                }
            }
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "law-block-line" },
                ...{ class: (line.attributes?.class) },
                ...{ style: (line.attributes?.style) },
            });
            if (line.children) {
                for (const [child] of __VLS_getVForSourceType((line.children))) {
                    /** @type {[typeof InlineNodeTemplate, ]} */ ;
                    // @ts-ignore
                    const __VLS_3 = __VLS_asFunctionalComponent(InlineNodeTemplate, new InlineNodeTemplate({
                        inlineNode: child,
                    }));
                    const __VLS_4 = __VLS_3({
                        inlineNode: child,
                    }, ...__VLS_functionalComponentArgsRest(__VLS_3));
                }
            }
        }
    }
    if (false) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "lawnote" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "lawnote-title" },
        });
        if (false) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "lawnote-content" },
            });
            __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.lawnotecontent) }, null, null);
        }
    }
    if (__VLS_ctx.showhistorylaw) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "historylaw" },
        });
        if (__VLS_ctx.historylawvec) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            for (const [historylaw] of __VLS_getVForSourceType((__VLS_ctx.historylawvec))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "historycontent" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                (historylaw.date);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
                (historylaw.content);
            }
        }
        else {
        }
    }
}
/** @type {__VLS_StyleScopedClasses['law-block']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-content-multiple']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-chapter-num']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-chapter']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-num']} */ ;
/** @type {__VLS_StyleScopedClasses['tool-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-eye']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-eye-slash']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-clock-rotate-left']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-lines']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-line']} */ ;
/** @type {__VLS_StyleScopedClasses['lawnote']} */ ;
/** @type {__VLS_StyleScopedClasses['lawnote-title']} */ ;
/** @type {__VLS_StyleScopedClasses['lawnote-content']} */ ;
/** @type {__VLS_StyleScopedClasses['historylaw']} */ ;
/** @type {__VLS_StyleScopedClasses['historycontent']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            InlineNodeTemplate: InlineNodeTemplate,
            ui: ui,
            lawnotecontent: lawnotecontent,
            historylawvec: historylawvec,
            showhistorylaw: showhistorylaw,
            clickhistorylaw: clickhistorylaw,
            showLines: showLines,
            card: card,
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

import { defineProps, computed, onMounted, ref, nextTick, onUnmounted } from 'vue';
const ApiLink = "http://localhost:8080";
const props = defineProps();
const enterul = ref('');
const enterli = ref('');
const enterli2 = ref('');
const enterli3 = ref('');
const enterli4 = ref('');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (__VLS_ctx.ullist) {
    for (const [ul] of __VLS_getVForSourceType((__VLS_ctx.ullist))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
            ...{ onMouseenter: (...[$event]) => {
                    if (!(__VLS_ctx.ullist))
                        return;
                    __VLS_ctx.enterul = ul.chapter;
                } },
            ...{ onMouseleave: (...[$event]) => {
                    if (!(__VLS_ctx.ullist))
                        return;
                    __VLS_ctx.enterul = '';
                } },
            ...{ class: "lawChapter1" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
            href: ('#' + ul.chapter),
        });
        (ul.chapter);
        if (ul.childChapters) {
            for (const [li] of __VLS_getVForSourceType((ul.childChapters))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                    ...{ onMouseenter: (...[$event]) => {
                            if (!(__VLS_ctx.ullist))
                                return;
                            if (!(ul.childChapters))
                                return;
                            __VLS_ctx.enterli = li.chapter;
                        } },
                    ...{ onMouseleave: (...[$event]) => {
                            if (!(__VLS_ctx.ullist))
                                return;
                            if (!(ul.childChapters))
                                return;
                            __VLS_ctx.enterli = '';
                        } },
                    ...{ class: "lawChapter2" },
                });
                __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.enterul === ul.chapter) }, null, null);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                    href: ('#' + li.chapter),
                });
                (li.chapter);
                if (li.childChapters) {
                    for (const [li2] of __VLS_getVForSourceType((li.childChapters))) {
                        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                            ...{ onMouseenter: (...[$event]) => {
                                    if (!(__VLS_ctx.ullist))
                                        return;
                                    if (!(ul.childChapters))
                                        return;
                                    if (!(li.childChapters))
                                        return;
                                    __VLS_ctx.enterli2 = li2.chapter;
                                } },
                            ...{ onMouseleave: (...[$event]) => {
                                    if (!(__VLS_ctx.ullist))
                                        return;
                                    if (!(ul.childChapters))
                                        return;
                                    if (!(li.childChapters))
                                        return;
                                    __VLS_ctx.enterli2 = '';
                                } },
                            ...{ class: "lawChapter3" },
                        });
                        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.enterli === li.chapter) }, null, null);
                        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                            href: ('#' + li2.chapter),
                        });
                        (li2.chapter);
                        if (li2.childChapters) {
                            for (const [li3] of __VLS_getVForSourceType((li2.childChapters))) {
                                __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                                    ...{ onMouseenter: (...[$event]) => {
                                            if (!(__VLS_ctx.ullist))
                                                return;
                                            if (!(ul.childChapters))
                                                return;
                                            if (!(li.childChapters))
                                                return;
                                            if (!(li2.childChapters))
                                                return;
                                            __VLS_ctx.enterli3 = li3.chapter;
                                        } },
                                    ...{ onMouseleave: (...[$event]) => {
                                            if (!(__VLS_ctx.ullist))
                                                return;
                                            if (!(ul.childChapters))
                                                return;
                                            if (!(li.childChapters))
                                                return;
                                            if (!(li2.childChapters))
                                                return;
                                            __VLS_ctx.enterli3 = '';
                                        } },
                                    ...{ class: "lawChapter4" },
                                });
                                __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.enterli2 === li2.chapter) }, null, null);
                                __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                                    href: ('#' + li3.chapter),
                                });
                                (li3.chapter);
                                if (li3.childChapters) {
                                    for (const [li4] of __VLS_getVForSourceType((li3.childChapters))) {
                                        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                                            ...{ onMouseenter: (...[$event]) => {
                                                    if (!(__VLS_ctx.ullist))
                                                        return;
                                                    if (!(ul.childChapters))
                                                        return;
                                                    if (!(li.childChapters))
                                                        return;
                                                    if (!(li2.childChapters))
                                                        return;
                                                    if (!(li3.childChapters))
                                                        return;
                                                    __VLS_ctx.enterli4 = li4.chapter;
                                                } },
                                            ...{ onMouseleave: (...[$event]) => {
                                                    if (!(__VLS_ctx.ullist))
                                                        return;
                                                    if (!(ul.childChapters))
                                                        return;
                                                    if (!(li.childChapters))
                                                        return;
                                                    if (!(li2.childChapters))
                                                        return;
                                                    if (!(li3.childChapters))
                                                        return;
                                                    __VLS_ctx.enterli4 = '';
                                                } },
                                            ...{ class: "lawChapter5" },
                                        });
                                        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.enterli3 === li3.chapter) }, null, null);
                                        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                                            href: ('#' + li4.chapter),
                                        });
                                        (li4.chapter);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
/** @type {__VLS_StyleScopedClasses['lawChapter1']} */ ;
/** @type {__VLS_StyleScopedClasses['lawChapter2']} */ ;
/** @type {__VLS_StyleScopedClasses['lawChapter3']} */ ;
/** @type {__VLS_StyleScopedClasses['lawChapter4']} */ ;
/** @type {__VLS_StyleScopedClasses['lawChapter5']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            enterul: enterul,
            enterli: enterli,
            enterli2: enterli2,
            enterli3: enterli3,
            enterli4: enterli4,
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

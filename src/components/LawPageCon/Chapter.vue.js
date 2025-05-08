import { ref } from 'vue';
import { get_chapter_lawList } from '../../types/Law.ts';
import { getApiUrl } from '../../utils/api';
import LawCard from '../LawCard.vue';
const ApiLink = getApiUrl();
const props = defineProps();
const LawLists = ref(null);
const enterul = ref('');
const showchapter = async (name) => {
    const chapter2 = name.replace(/\s+/g, "");
    LawLists.value = await get_chapter_lawList(props.chapter, chapter2, ApiLink);
    enterul.value = name;
    showlawlist.value = true;
};
const showlawlist = ref(true);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['lititle']} */ ;
/** @type {__VLS_StyleScopedClasses['lititle']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "chapter-area",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (__VLS_ctx.ullist) {
    for (const [ul] of __VLS_getVForSourceType((__VLS_ctx.ullist))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "lititle" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.ullist))
                        return;
                    __VLS_ctx.showchapter(ul.chapter);
                } },
        });
        (ul.chapter);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.enterul === ul.chapter) }, null, null);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.ullist))
                        return;
                    __VLS_ctx.showlawlist = false;
                } },
            ...{ class: "fa-solid fa-chevron-up" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showlawlist) }, null, null);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.ullist))
                        return;
                    __VLS_ctx.showlawlist = true;
                } },
            ...{ class: "fa-solid fa-chevron-down" },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.showlawlist) }, null, null);
        if (__VLS_ctx.enterul === ul.chapter) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            if (__VLS_ctx.LawLists) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showlawlist) }, null, null);
                for (const [law] of __VLS_getVForSourceType((__VLS_ctx.LawLists))) {
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                        ...{ class: "law-card" },
                    });
                    /** @type {[typeof LawCard, ]} */ ;
                    // @ts-ignore
                    const __VLS_0 = __VLS_asFunctionalComponent(LawCard, new LawCard({
                        law: (law),
                    }));
                    const __VLS_1 = __VLS_0({
                        law: (law),
                    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
                }
            }
        }
        if (ul.childChapters) {
            for (const [li] of __VLS_getVForSourceType((ul.childChapters))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                    ...{ class: "lawChapter2" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                    ...{ class: "lititle" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                    ...{ onClick: (...[$event]) => {
                            if (!(__VLS_ctx.ullist))
                                return;
                            if (!(ul.childChapters))
                                return;
                            __VLS_ctx.showchapter(li.chapter);
                        } },
                });
                (li.chapter);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.enterul === li.chapter) }, null, null);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
                    ...{ onClick: (...[$event]) => {
                            if (!(__VLS_ctx.ullist))
                                return;
                            if (!(ul.childChapters))
                                return;
                            __VLS_ctx.showlawlist = false;
                        } },
                    ...{ class: "fa-solid fa-chevron-up" },
                });
                __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showlawlist) }, null, null);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
                    ...{ onClick: (...[$event]) => {
                            if (!(__VLS_ctx.ullist))
                                return;
                            if (!(ul.childChapters))
                                return;
                            __VLS_ctx.showlawlist = true;
                        } },
                    ...{ class: "fa-solid fa-chevron-down" },
                });
                __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.showlawlist) }, null, null);
                if (__VLS_ctx.enterul === li.chapter) {
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                    if (__VLS_ctx.LawLists) {
                        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showlawlist) }, null, null);
                        for (const [law] of __VLS_getVForSourceType((__VLS_ctx.LawLists))) {
                            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                                ...{ class: "law-card" },
                            });
                            /** @type {[typeof LawCard, ]} */ ;
                            // @ts-ignore
                            const __VLS_3 = __VLS_asFunctionalComponent(LawCard, new LawCard({
                                law: (law),
                            }));
                            const __VLS_4 = __VLS_3({
                                law: (law),
                            }, ...__VLS_functionalComponentArgsRest(__VLS_3));
                        }
                    }
                }
                if (li.childChapters) {
                    for (const [li2] of __VLS_getVForSourceType((li.childChapters))) {
                        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                            ...{ class: "lawChapter3" },
                        });
                        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                            ...{ class: "lititle" },
                        });
                        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                            ...{ onClick: (...[$event]) => {
                                    if (!(__VLS_ctx.ullist))
                                        return;
                                    if (!(ul.childChapters))
                                        return;
                                    if (!(li.childChapters))
                                        return;
                                    __VLS_ctx.showchapter(li2.chapter);
                                } },
                        });
                        (li2.chapter);
                        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.enterul === li2.chapter) }, null, null);
                        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
                            ...{ onClick: (...[$event]) => {
                                    if (!(__VLS_ctx.ullist))
                                        return;
                                    if (!(ul.childChapters))
                                        return;
                                    if (!(li.childChapters))
                                        return;
                                    __VLS_ctx.showlawlist = false;
                                } },
                            ...{ class: "fa-solid fa-chevron-up" },
                        });
                        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showlawlist) }, null, null);
                        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
                            ...{ onClick: (...[$event]) => {
                                    if (!(__VLS_ctx.ullist))
                                        return;
                                    if (!(ul.childChapters))
                                        return;
                                    if (!(li.childChapters))
                                        return;
                                    __VLS_ctx.showlawlist = true;
                                } },
                            ...{ class: "fa-solid fa-chevron-down" },
                        });
                        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.showlawlist) }, null, null);
                        if (__VLS_ctx.enterul === li2.chapter) {
                            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                            if (__VLS_ctx.LawLists) {
                                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                                __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showlawlist) }, null, null);
                                for (const [law] of __VLS_getVForSourceType((__VLS_ctx.LawLists))) {
                                    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                                        ...{ class: "law-card" },
                                    });
                                    /** @type {[typeof LawCard, ]} */ ;
                                    // @ts-ignore
                                    const __VLS_6 = __VLS_asFunctionalComponent(LawCard, new LawCard({
                                        law: (law),
                                    }));
                                    const __VLS_7 = __VLS_6({
                                        law: (law),
                                    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
                                }
                            }
                        }
                        if (li2.childChapters) {
                            for (const [li3] of __VLS_getVForSourceType((li2.childChapters))) {
                                __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                                    ...{ class: "lawChapter4" },
                                });
                                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                                    ...{ class: "lititle" },
                                });
                                __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                                    ...{ onClick: (...[$event]) => {
                                            if (!(__VLS_ctx.ullist))
                                                return;
                                            if (!(ul.childChapters))
                                                return;
                                            if (!(li.childChapters))
                                                return;
                                            if (!(li2.childChapters))
                                                return;
                                            __VLS_ctx.showchapter(li3.chapter);
                                        } },
                                });
                                (li3.chapter);
                                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                                __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.enterul === li3.chapter) }, null, null);
                                __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
                                    ...{ onClick: (...[$event]) => {
                                            if (!(__VLS_ctx.ullist))
                                                return;
                                            if (!(ul.childChapters))
                                                return;
                                            if (!(li.childChapters))
                                                return;
                                            if (!(li2.childChapters))
                                                return;
                                            __VLS_ctx.showlawlist = false;
                                        } },
                                    ...{ class: "fa-solid fa-chevron-up" },
                                });
                                __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showlawlist) }, null, null);
                                __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
                                    ...{ onClick: (...[$event]) => {
                                            if (!(__VLS_ctx.ullist))
                                                return;
                                            if (!(ul.childChapters))
                                                return;
                                            if (!(li.childChapters))
                                                return;
                                            if (!(li2.childChapters))
                                                return;
                                            __VLS_ctx.showlawlist = true;
                                        } },
                                    ...{ class: "fa-solid fa-chevron-down" },
                                });
                                __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.showlawlist) }, null, null);
                                if (__VLS_ctx.enterul === li3.chapter) {
                                    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                                    if (__VLS_ctx.LawLists) {
                                        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                                        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showlawlist) }, null, null);
                                        for (const [law] of __VLS_getVForSourceType((__VLS_ctx.LawLists))) {
                                            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                                                ...{ class: "law-card" },
                                            });
                                            /** @type {[typeof LawCard, ]} */ ;
                                            // @ts-ignore
                                            const __VLS_9 = __VLS_asFunctionalComponent(LawCard, new LawCard({
                                                law: (law),
                                            }));
                                            const __VLS_10 = __VLS_9({
                                                law: (law),
                                            }, ...__VLS_functionalComponentArgsRest(__VLS_9));
                                        }
                                    }
                                }
                                if (li3.childChapters) {
                                    for (const [li4] of __VLS_getVForSourceType((li3.childChapters))) {
                                        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                                            ...{ class: "lawChapter5" },
                                        });
                                        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                                            ...{ class: "lititle" },
                                        });
                                        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                                            ...{ onClick: (...[$event]) => {
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
                                                    __VLS_ctx.showchapter(li4.chapter);
                                                } },
                                        });
                                        (li4.chapter);
                                        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                                        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.enterul === li4.chapter) }, null, null);
                                        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
                                            ...{ onClick: (...[$event]) => {
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
                                                    __VLS_ctx.showlawlist = false;
                                                } },
                                            ...{ class: "fa-solid fa-chevron-up" },
                                        });
                                        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showlawlist) }, null, null);
                                        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
                                            ...{ onClick: (...[$event]) => {
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
                                                    __VLS_ctx.showlawlist = true;
                                                } },
                                            ...{ class: "fa-solid fa-chevron-down" },
                                        });
                                        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.showlawlist) }, null, null);
                                        if (__VLS_ctx.enterul === li4.chapter) {
                                            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                                            if (__VLS_ctx.LawLists) {
                                                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
                                                __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showlawlist) }, null, null);
                                                for (const [law] of __VLS_getVForSourceType((__VLS_ctx.LawLists))) {
                                                    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                                                        ...{ class: "law-card" },
                                                    });
                                                    /** @type {[typeof LawCard, ]} */ ;
                                                    // @ts-ignore
                                                    const __VLS_12 = __VLS_asFunctionalComponent(LawCard, new LawCard({
                                                        law: (law),
                                                    }));
                                                    const __VLS_13 = __VLS_12({
                                                        law: (law),
                                                    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
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
        }
    }
}
if (__VLS_ctx.LawLists) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    for (const [law] of __VLS_getVForSourceType((__VLS_ctx.LawLists))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "law-card" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "law-card-title" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (law.num);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
            ...{ class: 'law-block-lines' },
        });
        for (const [line] of __VLS_getVForSourceType((law.lines))) {
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
    }
}
/** @type {__VLS_StyleScopedClasses['lititle']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-chevron-up']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-chevron-down']} */ ;
/** @type {__VLS_StyleScopedClasses['law-card']} */ ;
/** @type {__VLS_StyleScopedClasses['lawChapter2']} */ ;
/** @type {__VLS_StyleScopedClasses['lititle']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-chevron-up']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-chevron-down']} */ ;
/** @type {__VLS_StyleScopedClasses['law-card']} */ ;
/** @type {__VLS_StyleScopedClasses['lawChapter3']} */ ;
/** @type {__VLS_StyleScopedClasses['lititle']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-chevron-up']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-chevron-down']} */ ;
/** @type {__VLS_StyleScopedClasses['law-card']} */ ;
/** @type {__VLS_StyleScopedClasses['lawChapter4']} */ ;
/** @type {__VLS_StyleScopedClasses['lititle']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-chevron-up']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-chevron-down']} */ ;
/** @type {__VLS_StyleScopedClasses['law-card']} */ ;
/** @type {__VLS_StyleScopedClasses['lawChapter5']} */ ;
/** @type {__VLS_StyleScopedClasses['lititle']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-chevron-up']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-chevron-down']} */ ;
/** @type {__VLS_StyleScopedClasses['law-card']} */ ;
/** @type {__VLS_StyleScopedClasses['law-card']} */ ;
/** @type {__VLS_StyleScopedClasses['law-card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-lines']} */ ;
/** @type {__VLS_StyleScopedClasses['law-indent']} */ ;
/** @type {__VLS_StyleScopedClasses['law-block-line']} */ ;
/** @type {__VLS_StyleScopedClasses['line-0000']} */ ;
/** @type {__VLS_StyleScopedClasses['show-number']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LawCard: LawCard,
            LawLists: LawLists,
            enterul: enterul,
            showchapter: showchapter,
            showlawlist: showlawlist,
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

import { defineProps, ref, onMounted, nextTick, watch } from 'vue';
import { loadLaw } from '../../types/Law';
import LawCard from '../LawCard.vue';
const props = defineProps();
const rawContent = ref('');
const realpage = ref(null);
const html = ref('');
const TheSearchingText = ref('');
const searchText = ref('');
const count = ref(0);
const goCount = ref(0);
const mainparts = ref('');
const reason = ref('');
const lawvec = ref([]);
const lawnamevec = ref([]);
import { getApiUrl } from '../../utils/api.ts';
const ApiLink = getApiUrl();
onMounted(async () => {
    lawvec.value = [];
    lawnamevec.value = [];
    if (props.datax.reflaws) {
        let set = new Set(props.datax.reflaws);
        let array = Array.from(set);
        array.forEach(async (id) => {
            const [chapter, num] = id.split("-");
            lawnamevec.value.push(chapter);
            let law = await loadLaw(chapter, num, ApiLink);
            if (law) {
                lawvec.value.push(law);
            }
        });
    }
    let set = new Set(lawnamevec.value);
    lawnamevec.value = Array.from(set);
    await nextTick();
    mainparts.value = convertToHTML2(props.datax.maincontent);
    reason.value = convertToHTML(props.datax.reason);
});
watch(() => props.datax, async (data) => {
    lawvec.value = [];
    lawnamevec.value = [];
    if (props.datax.reflaws) {
        let set = new Set(data.reflaws);
        let array = Array.from(set);
        array.forEach(async (id) => {
            const [chapter, num] = id.split("-");
            lawnamevec.value.push(chapter);
            let law = await loadLaw(chapter, num, ApiLink);
            if (law) {
                lawvec.value.push(law);
            }
        });
    }
    let set = new Set(lawnamevec.value);
    lawnamevec.value = Array.from(set);
    await nextTick();
    mainparts.value = convertToHTML2(data.maincontent);
    reason.value = convertToHTML(data.reason);
});
import { useUiStore } from '../../store/page.ts';
const ui = useUiStore();
const handleclicklaw = (event) => {
    const target = event.target;
    if (target.classList.contains('spanlawname')) {
        const id = target.dataset.lawname;
        if (id) {
            ui.goToLawPage(id);
        }
    }
};
const convertToHTML = (text) => {
    return text
        .split('】')
        .map(p => `<p>${p.replace(/\n/g, '')}】</p>`)
        .map(par => {
        lawnamevec.value.forEach(lawname => {
            const replacement = `<span class="spanlawname" data-lawname="${lawname}">${lawname}</span>`;
            par = par.replace(new RegExp(lawname, "g"), replacement);
        });
        return par;
    })
        .join('');
};
const convertToHTML2 = (text) => {
    return text
        .map(p => `<p>${p.replace(/\n/g, '')}</p>`)
        .map(par => {
        lawnamevec.value.forEach(lawname => {
            const replacement = `<span class="spanlawname" data-lawname="${lawname}">${lawname}</span>`;
            par = par.replace(new RegExp(lawname, "g"), replacement);
        });
        return par;
    }).join('');
};
const searching = () => {
    searchText.value = TheSearchingText.value;
    count.value = 0;
    fakePageHtml.value = returnfake();
};
const handleClick = () => {
    if (goCount.value === count.value) {
        goCount.value = 0;
    }
    else {
        goCount.value += 1;
    }
    // 更新完成後手動設定 hash（或依需求處理）
    nextTick(() => {
        const element = document.getElementById(`FindingText-${goCount.value}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
};
const fakePageHtml = ref("");
function returnfake() {
    html.value = (realpage.value?.innerHTML || "");
    let x = html.value.includes(searchText.value);
    if (!x) {
        return "找不到" + searchText.value;
    }
    else {
        count.value = 0;
        let buffer = html.value.replace(new RegExp(searchText.value, "g"), () => {
            count.value++;
            return `<span class='highlight' id='FindingText-${count.value}'>${searchText.value}</span>`;
        });
        return buffer;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['law-block-line']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "newinterpretation_area",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "page",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "fakePage",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.searchText !== '') }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.fakePageHtml) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "realpage",
    id: "realpage",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.searchText === '') }, null, null);
/** @type {typeof __VLS_ctx.realpage} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "no" },
    id: "name",
});
(__VLS_ctx.datax.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "row casename" },
});
(__VLS_ctx.datax.casename);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "title" },
    id: "Date",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "content" },
});
(__VLS_ctx.datax.date);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "title" },
    id: "CaseSummary",
});
if (__VLS_ctx.datax.reason) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "content" },
    });
    (__VLS_ctx.datax.casesummary);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "title" },
    id: "Source",
});
if (__VLS_ctx.datax.source) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "content" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: (__VLS_ctx.datax.source),
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "title" },
    id: "RefLaws",
});
if (__VLS_ctx.datax.reflaws) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "content" },
    });
    for (const [law] of __VLS_getVForSourceType((__VLS_ctx.lawvec))) {
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "title" },
    id: "Content",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.handleclicklaw) },
    ...{ class: "content" },
});
__VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.mainparts) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "title" },
    id: "Reason",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.handleclicklaw) },
    ...{ class: "content" },
});
__VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.reason) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "toolarea",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    id: "chapterlist",
});
(__VLS_ctx.datax.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#Date",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#CaseSummary",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#Source",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#RefLaws",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#Content",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    href: "#Reason",
});
if (__VLS_ctx.lawnamevec) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        id: "lawnamevec",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    for (const [lawname] of __VLS_getVForSourceType((__VLS_ctx.lawnamevec))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.lawnamevec))
                        return;
                    __VLS_ctx.ui.goToLawPage(lawname);
                } },
        });
        (lawname);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (__VLS_ctx.searching) },
});
(__VLS_ctx.TheSearchingText);
if (__VLS_ctx.searchText !== '') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.count);
}
if (__VLS_ctx.searchText !== '') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        id: "searchbytextbtn",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        ...{ onClick: (__VLS_ctx.handleClick) },
        id: "nextbtn",
    });
}
/** @type {__VLS_StyleScopedClasses['no']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['casename']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['law-card']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LawCard: LawCard,
            realpage: realpage,
            TheSearchingText: TheSearchingText,
            searchText: searchText,
            count: count,
            mainparts: mainparts,
            reason: reason,
            lawvec: lawvec,
            lawnamevec: lawnamevec,
            ui: ui,
            handleclicklaw: handleclicklaw,
            searching: searching,
            handleClick: handleClick,
            fakePageHtml: fakePageHtml,
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

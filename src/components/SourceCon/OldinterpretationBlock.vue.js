import { defineProps, ref, onMounted, nextTick, watch } from 'vue';
import { loadLaw } from '../../types/Law';
import LawCard from '../LawCard.vue';
import { getApiUrl } from '../../utils/api';
import { useUiStore } from '../../store/page.ts';
const ApiLink = getApiUrl();
const props = defineProps();
//2.初始與變化載入
const rawContent = ref("");
const lawvec = ref([]);
const intervec2 = ref([]);
const ReasonHtml = ref(null);
onMounted(() => {
    // newinterpretationdata.value = props.data as newinterpretation;
    lawvec.value = [];
    intervec2.value = [];
    if (props.datax.content) {
        rawContent.value = convertToHTML(props.datax.content);
    }
    if (props.datax.reasoning) {
        ReasonHtml.value = convertToHTML(props.datax.reasoning);
    }
    if (props.datax.reflawid) {
        let set = new Set(props.datax.reflawid);
        let array = Array.from(set);
        array.forEach(async (id) => {
            const [chapter, num] = id.split("-");
            let law = await loadLaw(chapter, num, ApiLink);
            if (law) {
                lawvec.value.push(law);
            }
        });
    }
    if (props.datax.refinter) {
        let v = props.datax.refinter;
        intervec2.value = v.map(item => parseInt(item)).filter(num => num < 1000).sort();
    }
});
watch(() => props.datax, (data) => {
    lawvec.value = [];
    intervec2.value = [];
    if (data.content) {
        rawContent.value = convertToHTML(data.content);
    }
    if (data.reflawid) {
        let set = new Set(data.reflawid);
        let array = Array.from(set);
        array.forEach(async (id) => {
            const [chapter, num] = id.split("-");
            let law = await loadLaw(chapter, num, ApiLink);
            if (law) {
                lawvec.value.push(law);
            }
        });
    }
    if (data.refinter) {
        let v = data.refinter;
        intervec2.value = v.map(item => parseInt(item)).filter(num => num < 1000).sort();
        let set = new Set(intervec2.value);
        intervec2.value = Array.from(set);
    }
});
function convertToHTML(text) {
    return text
        .split(/。{1,}\n/) // 兩個以上換行視為一個段落
        .map(p => `<p>${p.replace(/\n/g, '')}</p>`) // 保留段落內的換行
        .map(par => {
        if (props.datax.refinter) {
            props.datax.refinter.forEach(internum => {
                const replacement = `<span class="spanoldinter" data-oldintername="${internum}">第${internum}號</span>`;
                const findingtext = `第${internum}號`;
                par = par.replace(new RegExp(findingtext, "g"), replacement);
            });
        }
        return par;
    })
        .map(par => {
        if (props.datax.reflaws) {
            props.datax.reflaws.filter(item => item !== "刑法").forEach(lawname => {
                const replacement = `<span class="spanlawname" data-lawname="${lawname}">${lawname}</span>`;
                par = par.replace(new RegExp(lawname, "g"), replacement);
            });
        }
        return par;
    })
        .join('');
}
//3.處理搜索文字
const chaptervec = ["Date", "Trouble", "Reason", "Content"];
const searchText = ref("");
const realpage = ref(null);
const count = ref(0);
const goCount = ref(0);
const html = ref('');
const TheSearchingText = ref('');
const fakePageHtml = ref("");
const handleclicklaw = (event) => {
    const target = event.target;
    if (target.classList.contains('spanlawname')) {
        const id = target.dataset.lawname;
        if (id) {
            ui.goToLawPage(id);
        }
    }
    else if (target.classList.contains('spanoldinter')) {
        const id = target.dataset.oldintername;
        if (id) {
            ui.goToOldInter(id);
        }
    }
};
const searching = () => {
    searchText.value = TheSearchingText.value;
    count.value = 0;
    fakePageHtml.value = returnfake();
};
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
// 4.處理法律文字搜索
const ui = useUiStore();
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
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "newinterpretation_area",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "fakePage",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.searchText !== '') }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.fakePageHtml) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "realpage",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.searchText === '') }, null, null);
/** @type {typeof __VLS_ctx.realpage} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "no" },
});
(__VLS_ctx.datax.id);
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
if (__VLS_ctx.datax.reflaws) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "title" },
        id: "RefLaws",
    });
    if (__VLS_ctx.lawvec) {
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
}
if (__VLS_ctx.datax.trouble) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "title" },
        id: "Trouble",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "content" },
    });
    (__VLS_ctx.datax.trouble);
}
if (__VLS_ctx.ReasonHtml) {
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
    __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.ReasonHtml) }, null, null);
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
__VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.rawContent) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "toolarea",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    id: "chapterlist",
});
(__VLS_ctx.datax.id);
for (const [chapter] of __VLS_getVForSourceType((__VLS_ctx.chaptervec))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: ('#' + chapter),
    });
    (chapter);
}
if (__VLS_ctx.datax.reflaws) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        id: "lawnamevec",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    for (const [lawname] of __VLS_getVForSourceType((__VLS_ctx.datax.reflaws))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.datax.reflaws))
                        return;
                    __VLS_ctx.ui.goToLawPage(lawname);
                } },
        });
        (lawname);
    }
}
if (__VLS_ctx.datax.refinter) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        id: "intervec",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    for (const [intername] of __VLS_getVForSourceType((__VLS_ctx.intervec2))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.datax.refinter))
                        return;
                    __VLS_ctx.ui.goToOldInter(intername.toString());
                } },
        });
        (intername);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
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
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LawCard: LawCard,
            rawContent: rawContent,
            lawvec: lawvec,
            intervec2: intervec2,
            ReasonHtml: ReasonHtml,
            chaptervec: chaptervec,
            searchText: searchText,
            realpage: realpage,
            count: count,
            TheSearchingText: TheSearchingText,
            fakePageHtml: fakePageHtml,
            handleclicklaw: handleclicklaw,
            searching: searching,
            ui: ui,
            handleClick: handleClick,
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

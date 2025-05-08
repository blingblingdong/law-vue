import { defineProps, ref, onMounted, computed, watch, markRaw } from 'vue';
// @ts-expect-error
import { RecycleScroller } from 'vue3-virtual-scroller';
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';
import NewinterpretationBlock from './SourceCon/NewinterpretationBlock.vue';
import OldinterpretationBlock from './SourceCon/OldinterpretationBlock.vue';
import ResolutionBlock from './SourceCon/ResolutionBlock.vue';
import PrecedentBlock from './SourceCon/PrecedentBlock.vue';
import LawPage from './LawPage.vue';
import { get_note, get_note_nav } from '../types/Note.ts';
import FilePage from './FilePage.vue';
const workingitemlist = ref([]);
const showingitem = ref(null);
async function pushworkingitem(pushingitem) {
    // 1.先找有沒有重複
    let duplicate_flag = false;
    workingitemlist.value.forEach(theitem => {
        if (theitem.item.name === pushingitem.name) {
            duplicate_flag = true;
        }
    });
    //2.如果沒有重複
    if (!duplicate_flag) {
        let buffer = await finditem(pushingitem);
        if (buffer == null) {
            return false;
        }
        workingitemlist.value.push(buffer);
        workingitemlist.value = [
            ...workingitemlist.value.filter(item => !item.locked),
            ...workingitemlist.value.filter(item => item.locked),
        ];
        if (workingitemlist.value.length > 5) {
            workingitemlist.value.shift(); // 移除最前面那個（應是可刪的）
        }
    }
    return true;
}
async function finditem(pushingitem) {
    let buffer = {
        item: pushingitem,
        con: markRaw(get_style(pushingitem.sourcetype).con),
        locked: false
    };
    buffer.item = pushingitem;
    //2.1找component 
    if (buffer.item.sourcetype === 'lawname') {
        buffer.data = { chapter: buffer.item.name };
    }
    else if (buffer.item.sourcetype === 'note') {
        const [username, foldername, notename] = buffer.item.id.split("-");
        const note = await get_note(ApiLink, username, foldername, notename);
        const notenav = await get_note_nav(ApiLink, buffer.item.id);
        if (note && notenav) {
            buffer.data = { theNote: note, theNoteNav: notenav };
        }
        else {
            return null;
        }
    }
    else {
        const res = await fetch(`${ApiLink}/${buffer.item.sourcetype}/${buffer.item.id}`);
        if (!res.ok) {
            return null;
        }
        const resdata = await res.json();
        buffer.data = { datax: resdata };
    }
    return buffer;
}
const search = ref(null);
const searchtype = ref("all");
const placeholder = ref("");
const data = ref();
const othersourcelist = ref(null);
import { getApiUrl } from '../utils/api';
const ApiLink = getApiUrl();
const history = ref([]);
import { useUiStore } from '../store/page.ts';
const ui = useUiStore();
onMounted(async () => {
    const raw = localStorage.getItem("sourcename");
    if (!raw) {
        history.value = [];
        return;
    }
    else {
        history.value = JSON.parse(raw);
    }
    if (ui.searchItem.name !== "") {
        clickitem(ui.searchItem);
    }
});
watch(() => ui.searchItem, (item) => {
    clickitem(item);
});
onMounted(async () => {
    othersourcelist.value = [];
    style_vec.filter(item => item.sourcetype !== 'all').forEach(async (item) => {
        const list = await getlawsourcelist(item.sourcetype);
        othersourcelist.value = othersourcelist.value?.concat(list);
    });
});
const clicktype = async (sourcetype) => {
    searchtype.value = sourcetype;
    search.value = "";
    showlist.value = false;
    if (sourcetype === "all") {
        othersourcelist.value = [];
        style_vec.forEach(async (item) => {
            const list = await getlawsourcelist(item.sourcetype);
            othersourcelist.value = othersourcelist.value?.concat(list);
        });
        return;
    }
    othersourcelist.value = await getlawsourcelist(sourcetype);
};
let style_vec = [
    { sourcetype: "newinterpretation", color: "darkblue", name: "憲判字", con: NewinterpretationBlock },
    { sourcetype: "oldinterpretation", color: "#cc6699", name: "舊釋字", con: OldinterpretationBlock },
    { sourcetype: "precedent", color: "darkred", name: "判例", con: PrecedentBlock },
    { sourcetype: "resolution", color: "#ff6600", name: "決議", con: ResolutionBlock },
    { sourcetype: "lawname", color: "darkgreen", name: "法條", con: LawPage },
    { sourcetype: "all", color: "purple", name: "全域!", con: LawPage },
    { sourcetype: "note", color: "darkgreen", name: "筆記", con: FilePage },
];
const get_style = (sourcetype) => {
    let returned_style = style_vec[0];
    style_vec.forEach(item => {
        if (item.sourcetype === sourcetype) {
            returned_style = item;
        }
    });
    return returned_style;
};
let filter_list = ref(null);
const inputing = () => {
    isinclude(searchtype.value);
};
function isinclude(sourcetype) {
    if (search.value != null) {
        const val = search.value.toString();
        if (sourcetype === "oldinterpretation" && othersourcelist.value) {
            filter_list.value = othersourcelist.value.filter(item => {
                return item.id === val;
            });
        }
        else if (sourcetype === "newinterpretation" && othersourcelist.value) {
            filter_list.value = othersourcelist.value.filter(item => {
                return item.name.includes(val);
            });
        }
        else if (sourcetype === "resolution" && othersourcelist.value) {
            filter_list.value = othersourcelist.value.filter(item => {
                return item.name.includes(val);
            });
        }
        else if (sourcetype === "lawname" && othersourcelist.value) {
            filter_list.value = othersourcelist.value.filter(item => {
                return item.name.includes(val);
            });
        }
        else if (sourcetype === "precedent" && othersourcelist.value) {
            filter_list.value = othersourcelist.value.filter(item => {
                return item.name.includes(val);
            });
        }
        else if (sourcetype === "all" && othersourcelist.value) {
            filter_list.value = othersourcelist.value.filter(item => {
                return item.name.includes(val);
            });
        }
        else if (sourcetype === "note" && othersourcelist.value) {
            filter_list.value = othersourcelist.value.filter(item => {
                return item.name.includes(val);
            });
        }
    }
}
async function getlawsourcelist(type) {
    if (type === 'note') {
        const res = await fetch(`${ApiLink}/${type}list/test_user`);
        const listdata = await res.json();
        return listdata;
    }
    else {
        try {
            const res = await fetch(`${ApiLink}/${type}list`);
            const listdata = await res.json();
            return listdata;
        }
        catch (e) {
            console.error("載入資料失敗:", e);
            return [];
        }
    }
}
;
const nowarea = ref("search");
const clickitem = async (item) => {
    // 1.先來看看item是否真的存在
    let res = await pushworkingitem(item);
    if (res) {
        history.value = history.value.filter(historyitem => historyitem.name !== item.name);
        history.value.push(item);
        localStorage.setItem("sourcename", JSON.stringify(history.value));
        nowarea.value = 'result';
        showingitem.value = item.name;
    }
    else {
        window.swal("發生錯誤，該資源不存在，或網路壞去!");
        history.value = history.value.filter(historyitem => historyitem.name !== item.name);
        localStorage.setItem("sourcename", JSON.stringify(history.value));
    }
};
const closeitem = (item) => {
    workingitemlist.value = workingitemlist.value.filter(theitem => theitem.item !== item);
    nowarea.value = 'search';
};
const backtosearch = () => {
    nowarea.value = 'search';
};
const reversedHistory = computed(() => {
    return [...history.value].reverse();
});
const reversedTags = computed(() => {
    return [...workingitemlist.value].reverse();
});
const showlist = ref(false);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['selected']} */ ;
/** @type {__VLS_StyleScopedClasses['historyitem']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['sourcetag']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "lawsourcepage",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "tag-area",
});
for (const [workingitem] of __VLS_getVForSourceType((__VLS_ctx.reversedTags))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ({ 'onthisitem': workingitem.item.name === __VLS_ctx.showingitem }) },
    });
    if (!workingitem.locked) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
            ...{ onClick: (...[$event]) => {
                    if (!(!workingitem.locked))
                        return;
                    __VLS_ctx.closeitem(workingitem.item);
                } },
            ...{ class: "fa-solid fa-xmark" },
        });
    }
    if (workingitem.locked) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
            ...{ class: "fa-solid fa-lock" },
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.clickitem(workingitem.item);
            } },
    });
    (' ' + workingitem.item.name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "search-area",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.nowarea === 'search') }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "inputRow",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    ...{ onInput: (__VLS_ctx.inputing) },
    placeholder: (__VLS_ctx.placeholder),
});
(__VLS_ctx.search);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "sourrcetypelist" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "selected" },
    ...{ style: ({ 'background-color': __VLS_ctx.get_style(__VLS_ctx.searchtype).color }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showlist = true;
        } },
    ...{ class: "fa-solid fa-chevron-down" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.showlist) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showlist = false;
        } },
    ...{ class: "fa-solid fa-chevron-up" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showlist) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.get_style(__VLS_ctx.searchtype).name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    id: "dropdown",
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.style_vec))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.clicktype(item.sourcetype);
            } },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showlist) }, null, null);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ class: "fa-solid fa-circle" },
        ...{ style: ({ color: __VLS_ctx.get_style(item.sourcetype).color }) },
    });
    (item.name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
if (__VLS_ctx.history) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "historylist",
    });
    if (__VLS_ctx.history) {
        for (const [item] of __VLS_getVForSourceType((__VLS_ctx.reversedHistory))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.history))
                            return;
                        if (!(__VLS_ctx.history))
                            return;
                        __VLS_ctx.clickitem(item);
                    } },
                ...{ class: "historyitem" },
            });
            (item.name.trim());
        }
    }
}
if (__VLS_ctx.othersourcelist && !__VLS_ctx.search) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "alloptionlist",
    });
    const __VLS_0 = {}.RecycleScroller;
    /** @type {[typeof __VLS_components.RecycleScroller, typeof __VLS_components.RecycleScroller, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        items: (__VLS_ctx.othersourcelist),
        itemSize: (50),
        keyFeild: "id",
        ...{ class: "scroller" },
    }));
    const __VLS_2 = __VLS_1({
        items: (__VLS_ctx.othersourcelist),
        itemSize: (50),
        keyFeild: "id",
        ...{ class: "scroller" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    {
        const { default: __VLS_thisSlot } = __VLS_3.slots;
        const [{ item }] = __VLS_getSlotParams(__VLS_thisSlot);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.othersourcelist && !__VLS_ctx.search))
                        return;
                    __VLS_ctx.clickitem(item);
                } },
            sourcetype: (item.sourcetype),
            id: (item.id),
            ...{ class: "item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "sourcetag" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ style: ({ 'background-color': __VLS_ctx.get_style(item.sourcetype).color }) },
        });
        (__VLS_ctx.get_style(item.sourcetype).name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "itemname" },
        });
        (item.name);
    }
    var __VLS_3;
}
if (__VLS_ctx.search) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "inputoptionlist",
    });
    const __VLS_4 = {}.RecycleScroller;
    /** @type {[typeof __VLS_components.RecycleScroller, typeof __VLS_components.RecycleScroller, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        items: (__VLS_ctx.filter_list),
        itemSize: (50),
        keyFeild: "id",
        ...{ class: "scroller" },
    }));
    const __VLS_6 = __VLS_5({
        items: (__VLS_ctx.filter_list),
        itemSize: (50),
        keyFeild: "id",
        ...{ class: "scroller" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    {
        const { default: __VLS_thisSlot } = __VLS_7.slots;
        const [{ item }] = __VLS_getSlotParams(__VLS_thisSlot);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.search))
                        return;
                    __VLS_ctx.clickitem(item);
                } },
            sourcetype: (item.sourcetype),
            id: (item.id),
            ...{ class: "item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "sourcetag" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ style: ({ 'background-color': __VLS_ctx.get_style(item.sourcetype).color }) },
        });
        (__VLS_ctx.get_style(item.sourcetype).name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "itemname" },
        });
        (item.name);
    }
    var __VLS_7;
}
if (__VLS_ctx.nowarea === 'result') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "result-area",
    });
    for (const [w, i] of __VLS_getVForSourceType((__VLS_ctx.workingitemlist))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showingitem && w.item.name === __VLS_ctx.showingitem) }, null, null);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            id: "backtosearch",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
            ...{ onClick: (__VLS_ctx.backtosearch) },
            ...{ class: "fa-solid fa-arrow-left" },
        });
        if (w.locked == true) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.nowarea === 'result'))
                            return;
                        if (!(w.locked == true))
                            return;
                        w.locked = false;
                    } },
                ...{ class: "fa-solid fa-lock" },
            });
        }
        if (w.locked == false) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.nowarea === 'result'))
                            return;
                        if (!(w.locked == false))
                            return;
                        w.locked = true;
                    } },
                ...{ class: "fa-solid fa-lock-open" },
            });
        }
        const __VLS_8 = ((w.con));
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
            key: (i),
            ...(w.data),
        }));
        const __VLS_10 = __VLS_9({
            key: (i),
            ...(w.data),
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    }
}
/** @type {__VLS_StyleScopedClasses['onthisitem']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-xmark']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-lock']} */ ;
/** @type {__VLS_StyleScopedClasses['sourrcetypelist']} */ ;
/** @type {__VLS_StyleScopedClasses['selected']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-chevron-down']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-chevron-up']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['historyitem']} */ ;
/** @type {__VLS_StyleScopedClasses['scroller']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['sourcetag']} */ ;
/** @type {__VLS_StyleScopedClasses['itemname']} */ ;
/** @type {__VLS_StyleScopedClasses['scroller']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['sourcetag']} */ ;
/** @type {__VLS_StyleScopedClasses['itemname']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-arrow-left']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-lock']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-lock-open']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RecycleScroller: RecycleScroller,
            workingitemlist: workingitemlist,
            showingitem: showingitem,
            search: search,
            searchtype: searchtype,
            placeholder: placeholder,
            othersourcelist: othersourcelist,
            history: history,
            clicktype: clicktype,
            style_vec: style_vec,
            get_style: get_style,
            filter_list: filter_list,
            inputing: inputing,
            nowarea: nowarea,
            clickitem: clickitem,
            closeitem: closeitem,
            backtosearch: backtosearch,
            reversedHistory: reversedHistory,
            reversedTags: reversedTags,
            showlist: showlist,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

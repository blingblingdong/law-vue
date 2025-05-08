import { defineProps, onMounted, ref, nextTick, onUnmounted, watch } from 'vue';
import { get_note_nav, update_note, update_note_name, update_note_state, delete_note, get_note_date, update_note_date } from '../types/Note';
import ParagraphBlock from './BlockCon/ParagraphBlock.vue';
import CustomCardBlock from './BlockCon/CustomCardBlock.vue';
import BlockQuoteBlock from './BlockCon/BlockQuoteBlock.vue';
import H2Block from './BlockCon/H2Block.vue';
import H3Block from './BlockCon/H3Block.vue';
import FigureBlock from './BlockCon/FigureBlock.vue';
const searchText = ref('');
const html = ref('');
const count = ref(0);
const goCount = ref(0);
const showNav = ref(false);
const sidebar = ref(false);
import { ClassicEditor, Editor } from 'ckeditor5';
import { editorConfig } from '../types/ck';
import { useAccountStore } from '../store/page.ts';
import { getApiUrl } from '../utils/api.ts';
const account = useAccountStore();
const deletenote = async () => {
    const willDelete = await swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete this file?",
        icon: "warning",
        dangerMode: true,
    });
    if (willDelete) {
        let res = await delete_note(ApiLink, localNote.value.id);
        if (res) {
            window.swal("Deleted!", `${localNote.value.id} has been deleted!`, "success");
        }
        else {
            window.swal("Oops!", "Seems like we couldn't fetch the info", "error");
        }
    }
};
const ApiLink = getApiUrl();
const fileDiv = ref(null);
const showli = ref('');
const props = defineProps();
const IsShowNav = ref(true);
const date = ref(null);
const localNote = ref(props.theNote);
const localNoteNav = ref(props.theNoteNav);
watch(() => props.theNote, (newNote) => {
    localNote.value = newNote;
});
watch(() => props.theNoteNav, (newNav) => {
    localNoteNav.value = newNav;
});
// 建立 type 與元件之間的對應表
const componentMap = {
    paragraph: ParagraphBlock,
    custom_card: CustomCardBlock,
    block_quote: BlockQuoteBlock,
    h2: H2Block,
    h3: H3Block,
    figure: FigureBlock
};
// 根據 block 的 type 返回對應的元件
const getComponent = (type) => {
    return componentMap[type] || ParagraphBlock;
};
const sharefile = () => {
    const url = `https://rustlawweb.netlify.app/?user=${props.theNote.user_name}&dir=${props.theNote.directory}&file_name=${props.theNote.file_name}`;
    navigator.share({
        url: url,
    });
};
// 儲存目前離 viewport 頂部最近的 h2 文字
const closestHeading = ref(null);
const handleWindowScroll = () => {
    if (!fileDiv.value)
        return;
    const h2Elements = fileDiv.value.querySelectorAll('h2');
    let minDistance = Infinity;
    let closest = null;
    h2Elements.forEach(h2 => {
        const rect = h2.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < minDistance) {
            minDistance = distance;
            closest = h2;
        }
    });
    if (closest != null) {
        closestHeading.value = closest.textContent;
    }
};
const editorMountPoint = ref(null);
onMounted(async () => {
    window.addEventListener('scroll', handleWindowScroll);
    // 初次載入時也計算一次
    handleWindowScroll();
    if (!editorMountPoint.value)
        return;
    ClassicEditor.create(editorMountPoint.value, editorConfig)
        .then(editor => {
        editorInstance.value = editor;
        // 為 clipboardInput 事件加上處理器，將剪貼簿內容以純文字插入
        editor.editing.view.document.on('clipboardInput', (evt, data) => {
            const plainText = data.dataTransfer.getData('text/plain');
            editor.model.change(writer => {
                editor.model.insertContent(writer.createText(plainText));
            });
            evt.stop(); // 阻止事件進一步傳播，避免重複處理
        }, { priority: 'highest' });
    })
        .catch(error => {
        console.error('There was a problem initializing the editor:', error);
    });
    date.value = await get_note_date(ApiLink, localNote.value.id);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleWindowScroll);
});
// 控制是否進入編輯模式的變數
const IntoEditor = ref(false);
// 儲存 CKEditor 實例（以便後續操作）
import { shallowRef } from 'vue';
const editorInstance = shallowRef(null);
// 用來參考編輯器掛載的 DOM 元素
const editorContainer = ref(null);
const enableEditor = async () => {
    let htmlContent = fileDiv.value?.innerHTML;
    IntoEditor.value = true;
    await nextTick();
    // 在組件掛載後取得 DOM 並初始化 CKEditor
    if (htmlContent === null) {
        editorInstance.value.setData("<p>加入文字</p>");
    }
    else {
        // let htmlContent = await SSR(n);
        editorInstance.value.setData(htmlContent);
    }
};
const saveNote = async () => {
    if (IntoEditor.value) {
        if (editorInstance) {
            let contentString = editorInstance.value.getData();
            let resNote = await update_note(ApiLink, localNote.value.id, contentString);
            const now = new Date();
            let resdate = await update_note_date(ApiLink, localNote.value.id, now.toISOString());
            if (resNote && resdate) {
                localNote.value = resNote;
                date.value = new Date(Date.now());
            }
            await nextTick();
            localNoteNav.value = await get_note_nav(ApiLink, localNote.value.id);
        }
        await nextTick();
        IntoEditor.value = false;
    }
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
const clickNav = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};
const fakePageHtml = function () {
    html.value = fileDiv.value?.innerHTML;
    if (!html.value.includes(searchText.value)) {
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
};
// let observer: MutationObserver | null = null;
const IsInUl = function (id) {
    if (id === showli.value) {
        return true;
    }
    return false;
};
const IsScroll = function (id) {
    if (id === closestHeading.value) {
        return true;
    }
    return false;
};
const changingnewname = ref('');
const changing_name = ref(false);
const change_name = async (newname) => {
    changing_name.value = true;
    let res = await update_note_name(ApiLink, localNote.value.id, newname);
    await nextTick();
    if (res) {
        localNote.value = res;
    }
    else {
        alert("換名失敗！");
    }
    changing_name.value = false;
};
const change_state = async () => {
    let state = localNote.value.public ? "false" : "true";
    let res = await update_note_state(ApiLink, localNote.value.id, state);
    await nextTick();
    res ? localNote.value.public = !localNote.value.public : alert("切換失敗");
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['publicFileNavUl']} */ ;
/** @type {__VLS_StyleScopedClasses['publicFileNavUl']} */ ;
/** @type {__VLS_StyleScopedClasses['publicFileNavUl']} */ ;
/** @type {__VLS_StyleScopedClasses['publicFileNavUl']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['save-or-edit']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.account.username === __VLS_ctx.localNote.user_name) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    if (__VLS_ctx.IntoEditor) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ onClick: (__VLS_ctx.saveNote) },
            ...{ class: "save-or-edit" },
        });
    }
    if (!__VLS_ctx.IntoEditor) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ onClick: (__VLS_ctx.enableEditor) },
            ...{ class: "save-or-edit" },
        });
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "TheNavHam",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.IsShowNav = true;
        } },
    ...{ class: "fa-solid fa-bars" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.IsShowNav) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "publicFileHeader",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "publicFiletitle",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "publicFileName",
});
if (!__VLS_ctx.changing_name) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.localNote.file_name);
    if (__VLS_ctx.account.username === __VLS_ctx.localNote.user_name) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
            ...{ onClick: (...[$event]) => {
                    if (!(!__VLS_ctx.changing_name))
                        return;
                    if (!(__VLS_ctx.account.username === __VLS_ctx.localNote.user_name))
                        return;
                    __VLS_ctx.changing_name = true;
                } },
            ...{ class: "fa-solid fa-pen" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
            ...{ onClick: (__VLS_ctx.deletenote) },
            ...{ class: "fa-solid fa-trash" },
        });
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({});
    (__VLS_ctx.changingnewname);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.changing_name))
                    return;
                __VLS_ctx.change_name(__VLS_ctx.changingnewname);
            } },
        ...{ class: "fa-solid fa-check" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
        ...{ onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.changing_name))
                    return;
                __VLS_ctx.changing_name = false;
            } },
        ...{ class: "fa-solid fa-xmark" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "publicFileWriter",
});
(__VLS_ctx.localNote.user_name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
(__VLS_ctx.date?.toDateString());
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
if (__VLS_ctx.localNote.public) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    if (__VLS_ctx.account.username === __VLS_ctx.localNote.user_name) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
            ...{ onClick: (__VLS_ctx.change_state) },
            ...{ class: "fa-regular fa-circle-check" },
        });
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    if (__VLS_ctx.account.username === __VLS_ctx.localNote.user_name) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
            ...{ onClick: (__VLS_ctx.change_state) },
            ...{ class: "fa-regular fa-circle" },
        });
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: 'sidebar' },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.sidebar) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.sidebar = false;
        } },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
if (__VLS_ctx.localNoteNav) {
    for (const [nav] of __VLS_getVForSourceType((__VLS_ctx.localNoteNav))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
            ...{ class: "publicFileNavUl" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.localNoteNav))
                        return;
                    __VLS_ctx.clickNav(nav.id);
                } },
        });
        (nav.text);
        if (nav.children) {
            for (const [li] of __VLS_getVForSourceType((nav.children))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                    ...{ class: "publicFileNavLi" },
                });
                __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                    ...{ onClick: (...[$event]) => {
                            if (!(__VLS_ctx.localNoteNav))
                                return;
                            if (!(nav.children))
                                return;
                            __VLS_ctx.clickNav(nav.id);
                        } },
                });
                (li.text);
            }
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "content-table",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
if (__VLS_ctx.localNoteNav) {
    for (const [nav] of __VLS_getVForSourceType((__VLS_ctx.localNoteNav))) {
        if (nav.text !== '') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
                ...{ onMouseenter: (...[$event]) => {
                        if (!(__VLS_ctx.localNoteNav))
                            return;
                        if (!(nav.text !== ''))
                            return;
                        __VLS_ctx.showli = nav.id;
                    } },
                ...{ onMouseleave: (...[$event]) => {
                        if (!(__VLS_ctx.localNoteNav))
                            return;
                        if (!(nav.text !== ''))
                            return;
                        __VLS_ctx.showli = '';
                    } },
                id: (nav.id),
                ...{ class: "publicFileNavUl" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: ({ inul: __VLS_ctx.IsInUl(nav.id), scrollh2: __VLS_ctx.IsScroll(nav.text) }) },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.localNoteNav))
                            return;
                        if (!(nav.text !== ''))
                            return;
                        __VLS_ctx.clickNav(nav.id);
                    } },
            });
            (nav.text);
            if (nav.children) {
                for (const [li] of __VLS_getVForSourceType((nav.children))) {
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                        ...{ class: "publicFileNavLi" },
                    });
                    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showli === nav.id) }, null, null);
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                        ...{ onClick: (...[$event]) => {
                                if (!(__VLS_ctx.localNoteNav))
                                    return;
                                if (!(nav.text !== ''))
                                    return;
                                if (!(nav.children))
                                    return;
                                __VLS_ctx.clickNav(li.id);
                            } },
                    });
                    (li.text);
                }
            }
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "publicContentAndNav",
});
if (__VLS_ctx.searchText === '' && !__VLS_ctx.IntoEditor) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ref: "fileDiv",
        id: "fileContentArea",
        ...{ class: "ck-content ck-editor__editable ck" },
    });
    /** @type {typeof __VLS_ctx.fileDiv} */ ;
    if (__VLS_ctx.localNote) {
        for (const [block, index] of __VLS_getVForSourceType((__VLS_ctx.localNote.content))) {
            const __VLS_0 = ((__VLS_ctx.getComponent(block.type)));
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
                key: (index),
                block: (block),
            }));
            const __VLS_2 = __VLS_1({
                key: (index),
                block: (block),
            }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        }
    }
}
if (__VLS_ctx.searchText !== '') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "fakePage",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.fakePageHtml()) }, null, null);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.IntoEditor) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
    ref: "editorMountPoint",
});
/** @type {typeof __VLS_ctx.editorMountPoint} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "publicFileNavArea",
    ...{ class: ({ mustShow: __VLS_ctx.showNav }) },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.IsShowNav) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "publicFileNav",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.IsShowNav = false;
        } },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ onClick: (__VLS_ctx.sharefile) },
    ...{ class: "fa-solid fa-share-nodes" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ class: "fa-solid fa-file-pdf" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    id: "onthispage",
});
if (__VLS_ctx.localNoteNav) {
    for (const [nav] of __VLS_getVForSourceType((__VLS_ctx.localNoteNav))) {
        if (nav.text !== '') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
                ...{ onMouseenter: (...[$event]) => {
                        if (!(__VLS_ctx.localNoteNav))
                            return;
                        if (!(nav.text !== ''))
                            return;
                        __VLS_ctx.showli = nav.id;
                    } },
                ...{ onMouseleave: (...[$event]) => {
                        if (!(__VLS_ctx.localNoteNav))
                            return;
                        if (!(nav.text !== ''))
                            return;
                        __VLS_ctx.showli = '';
                    } },
                id: (nav.id),
                ...{ class: "publicFileNavUl" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: ({ inul: __VLS_ctx.IsInUl(nav.id), scrollh2: __VLS_ctx.IsScroll(nav.text) }) },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.localNoteNav))
                            return;
                        if (!(nav.text !== ''))
                            return;
                        __VLS_ctx.clickNav(nav.id);
                    } },
            });
            (nav.text);
            if (nav.children) {
                for (const [li] of __VLS_getVForSourceType((nav.children))) {
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
                        ...{ class: "publicFileNavLi" },
                    });
                    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showli === nav.id) }, null, null);
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
                        ...{ onClick: (...[$event]) => {
                                if (!(__VLS_ctx.localNoteNav))
                                    return;
                                if (!(nav.text !== ''))
                                    return;
                                if (!(nav.children))
                                    return;
                                __VLS_ctx.clickNav(li.id);
                            } },
                    });
                    (li.text);
                }
            }
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({});
(__VLS_ctx.searchText);
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
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        ...{ onClick: (__VLS_ctx.handleClick) },
        id: "prebtn",
    });
}
/** @type {__VLS_StyleScopedClasses['save-or-edit']} */ ;
/** @type {__VLS_StyleScopedClasses['save-or-edit']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-bars']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-pen']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-trash']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-check']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-xmark']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-regular']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-circle-check']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-regular']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['publicFileNavUl']} */ ;
/** @type {__VLS_StyleScopedClasses['publicFileNavLi']} */ ;
/** @type {__VLS_StyleScopedClasses['publicFileNavUl']} */ ;
/** @type {__VLS_StyleScopedClasses['inul']} */ ;
/** @type {__VLS_StyleScopedClasses['scrollh2']} */ ;
/** @type {__VLS_StyleScopedClasses['publicFileNavLi']} */ ;
/** @type {__VLS_StyleScopedClasses['ck-content']} */ ;
/** @type {__VLS_StyleScopedClasses['ck-editor__editable']} */ ;
/** @type {__VLS_StyleScopedClasses['ck']} */ ;
/** @type {__VLS_StyleScopedClasses['mustShow']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-share-nodes']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-file-pdf']} */ ;
/** @type {__VLS_StyleScopedClasses['publicFileNavUl']} */ ;
/** @type {__VLS_StyleScopedClasses['inul']} */ ;
/** @type {__VLS_StyleScopedClasses['scrollh2']} */ ;
/** @type {__VLS_StyleScopedClasses['publicFileNavLi']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            searchText: searchText,
            count: count,
            showNav: showNav,
            sidebar: sidebar,
            account: account,
            deletenote: deletenote,
            fileDiv: fileDiv,
            showli: showli,
            IsShowNav: IsShowNav,
            date: date,
            localNote: localNote,
            localNoteNav: localNoteNav,
            getComponent: getComponent,
            sharefile: sharefile,
            editorMountPoint: editorMountPoint,
            IntoEditor: IntoEditor,
            enableEditor: enableEditor,
            saveNote: saveNote,
            handleClick: handleClick,
            clickNav: clickNav,
            fakePageHtml: fakePageHtml,
            IsInUl: IsInUl,
            IsScroll: IsScroll,
            changingnewname: changingnewname,
            changing_name: changing_name,
            change_name: change_name,
            change_state: change_state,
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

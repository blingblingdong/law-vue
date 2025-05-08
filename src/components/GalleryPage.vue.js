import { ref, onMounted } from 'vue';
import FilePage from './FilePage.vue';
import { get_every_note, get_note_list, get_note, get_note_nav } from '../types/Note.ts';
import { get_every_folders, get_folder } from '../types/Folder.ts';
const searchtype = ref('folder');
const folderlist = ref(null);
import { getApiUrl } from '../utils/api.ts';
const ApiLink = getApiUrl();
const notelist = ref(null);
const input = ref('');
const folderName = ref('');
const folderWriter = ref('');
const folderDescription = ref('');
const NowPage = ref('GalleryPage');
const FolderNoteList = ref([]);
const TheNote = ref(null);
const TheNav = ref(null);
const props = defineProps();
const foldershow = function (foldername) {
    let bool = true;
    if (input.value !== "") {
        bool = foldername.includes(input.value);
    }
    return bool;
};
const ToFolderbread = async function (foldername) {
    NowPage.value = "FirstPage";
    if (folderWriter.value && folderName.value) {
        let folder = await get_folder(ApiLink, folderWriter.value, folderName.value);
        FolderNoteList.value = await get_note_list(ApiLink, folderWriter.value, folderName.value);
        if (folder) {
            folderDescription.value = folder?.description;
        }
    }
};
const ToFolder = async function (folder) {
    NowPage.value = "FirstPage";
    folderName.value = folder.directory;
    folderDescription.value = folder.description;
    folderWriter.value = folder.user_name;
    FolderNoteList.value = await get_note_list(ApiLink, folderWriter.value, folderName.value);
};
const ToFile = async function (note) {
    TheNav.value = await get_note_nav(ApiLink, note.id);
    NowPage.value = "NotePage";
    TheNote.value = note;
    folderName.value = note.directory;
    folderWriter.value = note.user_name;
};
const FolderToFile = async function (notename) {
    NowPage.value = "NotePage";
    TheNote.value = await get_note(ApiLink, folderWriter.value, folderName.value, notename);
    TheNav.value = await get_note_nav(ApiLink, `${folderWriter.value}-${folderName.value}-${notename}`);
};
onMounted(async () => {
    folderlist.value = await get_every_folders(ApiLink);
    notelist.value = await get_every_note(ApiLink);
    if (props.TheUrl) {
        folderWriter.value = props.TheUrl.user_name;
        folderName.value = props.TheUrl.directory;
        NowPage.value = props.TheUrl.page;
        if (props.TheUrl.file) {
            TheNote.value = await get_note(ApiLink, folderWriter.value, folderName.value, props.TheUrl.file);
            TheNav.value = await get_note_nav(ApiLink, `${folderWriter.value}-${folderName.value}-${props.TheUrl.file}`);
        }
        else {
            let folder = await get_folder(ApiLink, folderWriter.value, folderName.value);
            FolderNoteList.value = await get_note_list(ApiLink, folderWriter.value, folderName.value);
            if (folder) {
                folderDescription.value = folder?.description;
            }
        }
    }
});
const sharefolder = () => {
    const url = `https://rustlawweb.netlify.app/?user=${folderWriter.value}&dir=${folderName.value}`;
    navigator.share({
        url: url,
    });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['catlog']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "galleryFindPage",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "breadsheet",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.NowPage !== 'GalleryPage') }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.NowPage = 'GalleryPage';
        } },
});
if (__VLS_ctx.folderName) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.folderName))
                    return;
                __VLS_ctx.ToFolderbread(__VLS_ctx.folderName);
            } },
    });
    (__VLS_ctx.folderName);
}
if (__VLS_ctx.TheNote && __VLS_ctx.NowPage === 'NotePage') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({});
    (__VLS_ctx.TheNote.file_name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "public-folder-find-page",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.NowPage === 'GalleryPage') }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "gallery-show-type",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.searchtype = 'file';
        } },
    ...{ class: ({ onsearch: __VLS_ctx.searchtype === 'file' }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.searchtype = 'folder';
        } },
    ...{ class: ({ onsearch: __VLS_ctx.searchtype === 'folder' }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
    id: "public-folder-name",
    placeholder: "查詢",
});
(__VLS_ctx.input);
if (__VLS_ctx.searchtype === 'folder' && __VLS_ctx.folderlist) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "public-dir-display",
    });
    for (const [folder] of __VLS_getVForSourceType((__VLS_ctx.folderlist))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.searchtype === 'folder' && __VLS_ctx.folderlist))
                        return;
                    __VLS_ctx.ToFolder(folder);
                } },
            ...{ class: 'AdisplayFolder' },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.foldershow(folder.directory)) }, null, null);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: 'AdisplayFolder-FolderName' },
        });
        (folder.directory);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: 'AdisplayFolder-writer' },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (folder.user_name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: 'AdisplayFolder-description' },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (folder.description);
    }
}
if (__VLS_ctx.searchtype === 'file' && __VLS_ctx.notelist) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "AdisplayFile-area",
    });
    for (const [note] of __VLS_getVForSourceType((__VLS_ctx.notelist))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.searchtype === 'file' && __VLS_ctx.notelist))
                        return;
                    __VLS_ctx.ToFile(note);
                } },
            ...{ class: 'AdisplayFile' },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.foldershow(note.file_name)) }, null, null);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: 'AdisplayFile-fileName' },
        });
        (note.file_name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: 'AdisplayFile-writer' },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (note.user_name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: 'AdisplayFile-dirName' },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (note.directory);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "FolderFirstPage",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.NowPage === 'FirstPage') }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: 'public-file-first-header',
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "in-public-folder-name",
});
(__VLS_ctx.folderName);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: 'public-folder-first-header-second-bar',
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: 'button-list' },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (__VLS_ctx.sharefolder) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: 'share-public-folder',
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "in-public-folder-writer",
});
(__VLS_ctx.folderWriter);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "description" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "public-file-word-area-first-description",
});
(__VLS_ctx.folderDescription);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: 'catlog' },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "public-file-word-area-first-file-list",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    id: "public-file-list-ul",
});
if (__VLS_ctx.FolderNoteList) {
    for (const [foldernotename] of __VLS_getVForSourceType((__VLS_ctx.FolderNoteList))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.FolderNoteList))
                        return;
                    __VLS_ctx.FolderToFile(foldernotename);
                } },
        });
        (foldernotename);
    }
}
if (__VLS_ctx.TheNote) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "publicFilePage",
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.NowPage === 'NotePage') }, null, null);
    if (__VLS_ctx.TheNote) {
        /** @type {[typeof FilePage, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(FilePage, new FilePage({
            theNote: (__VLS_ctx.TheNote),
            theNoteNav: (__VLS_ctx.TheNav),
        }));
        const __VLS_1 = __VLS_0({
            theNote: (__VLS_ctx.TheNote),
            theNoteNav: (__VLS_ctx.TheNav),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
}
/** @type {__VLS_StyleScopedClasses['onsearch']} */ ;
/** @type {__VLS_StyleScopedClasses['onsearch']} */ ;
/** @type {__VLS_StyleScopedClasses['AdisplayFolder']} */ ;
/** @type {__VLS_StyleScopedClasses['AdisplayFolder-FolderName']} */ ;
/** @type {__VLS_StyleScopedClasses['AdisplayFolder-writer']} */ ;
/** @type {__VLS_StyleScopedClasses['AdisplayFolder-description']} */ ;
/** @type {__VLS_StyleScopedClasses['AdisplayFile']} */ ;
/** @type {__VLS_StyleScopedClasses['AdisplayFile-fileName']} */ ;
/** @type {__VLS_StyleScopedClasses['AdisplayFile-writer']} */ ;
/** @type {__VLS_StyleScopedClasses['AdisplayFile-dirName']} */ ;
/** @type {__VLS_StyleScopedClasses['button-list']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['catlog']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            FilePage: FilePage,
            searchtype: searchtype,
            folderlist: folderlist,
            notelist: notelist,
            input: input,
            folderName: folderName,
            folderWriter: folderWriter,
            folderDescription: folderDescription,
            NowPage: NowPage,
            FolderNoteList: FolderNoteList,
            TheNote: TheNote,
            TheNav: TheNav,
            foldershow: foldershow,
            ToFolderbread: ToFolderbread,
            ToFolder: ToFolder,
            ToFile: ToFile,
            FolderToFile: FolderToFile,
            sharefolder: sharefolder,
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

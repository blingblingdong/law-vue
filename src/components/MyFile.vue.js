import { ref, onMounted, nextTick } from 'vue';
import FilePage from './FilePage.vue';
import { get_every_note, get_note_list, get_note, get_note_nav, create_note, create_dir } from '../types/Note';
import { get_every_folders, get_folder } from '../types/Folder';
const folderlist = ref(null);
import { getApiUrl } from '../utils/api';
import { useAccountStore } from '../store/page';
const ApiLink = getApiUrl();
const notelist = ref(null);
const input = ref('');
const TheNote = ref(null);
const TheNav = ref(null);
const user = ref("test_user");
const FolderNow = ref("");
const inputFileName = ref('');
const showCreateFile = ref(false);
const showsidebar = ref(true);
const notShowNote = ref(true);
const openSideBar = () => {
    // 1.將筆記本頁關閉
    notShowNote.value = true;
    //2.將筆記導覽開啟
    showsidebar.value = true;
};
const closeTheSideBar = () => {
    // 1.將筆記本頁開啟
    notShowNote.value = false;
    //2.將筆記導覽關閉
    showsidebar.value = false;
};
onMounted(async () => {
    folderlist.value = await get_every_folders(ApiLink);
});
const clickFolder = async (folder_name) => {
    notelist.value = await get_note_list(ApiLink, user.value, folder_name);
    FolderNow.value = folder_name;
};
const clickNote = async (notename) => {
    TheNote.value = await get_note(ApiLink, user.value, FolderNow.value, notename);
    TheNav.value = await get_note_nav(ApiLink, `${user.value}-${FolderNow.value}-${notename}`);
    notShowNote.value = false;
    showsidebar.value = false;
};
const createNote = async () => {
    let id = user.value + "-" + FolderNow.value + "-" + inputFileName.value;
    let note = { id: id, user_name: user.value, footer: null, content: null, file_name: inputFileName.value, directory: FolderNow.value, public: true };
    await create_note(ApiLink, note);
    await nextTick();
    notelist.value = await get_note_list(ApiLink, user.value, FolderNow.value);
    showCreateFile.value = false;
};
const account = useAccountStore();
const createDir = async () => {
    let res = await create_dir(ApiLink, account.username, inputDirName.value);
    if (res) {
        window.swal("創建成功!");
        folderlist.value = await get_every_folders(ApiLink);
    }
    else {
        window.swal("失敗...");
    }
    showCreateDir.value = false;
};
const showCreateDir = ref(false);
const inputDirName = ref("");
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['addNote']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "privateArea",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ onClick: (__VLS_ctx.closeTheSideBar) },
    ...{ class: "fa-solid fa-folder folderControll" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showsidebar) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ onClick: (__VLS_ctx.openSideBar) },
    ...{ class: "fa-solid fa-folder-open folderControll" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.showsidebar) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "privateFolderAndNote",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showsidebar) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "privateFolder",
});
if (__VLS_ctx.folderlist) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        id: "privateFolderList",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.folderlist))
                    return;
                __VLS_ctx.showCreateDir = true;
            } },
    });
    if (__VLS_ctx.showCreateDir) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            id: "crateDir",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({});
        (__VLS_ctx.inputDirName);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.createDir) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({});
    }
    for (const [folder] of __VLS_getVForSourceType((__VLS_ctx.folderlist))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            ...{ class: 'privateFolderName' },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.folderlist))
                        return;
                    __VLS_ctx.clickFolder(folder.directory);
                } },
        });
        (folder.directory);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "privateNote",
});
if (__VLS_ctx.notelist) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
        id: "privateNoteList",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.FolderNow);
    for (const [note] of __VLS_getVForSourceType((__VLS_ctx.notelist))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
            ...{ class: 'privateNoteName' },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.notelist))
                        return;
                    __VLS_ctx.clickNote(note);
                } },
        });
        (note);
    }
    if (__VLS_ctx.showCreateFile) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            id: "crateFile",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({});
        (__VLS_ctx.inputFileName);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.createNote) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({});
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        ...{ class: "addNote" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.notelist))
                    return;
                __VLS_ctx.showCreateFile = true;
            } },
    });
}
if (__VLS_ctx.TheNote) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: "privateFile",
        ...{ class: ({ notshowNote: __VLS_ctx.notShowNote }) },
    });
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
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-folder']} */ ;
/** @type {__VLS_StyleScopedClasses['folderControll']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-folder-open']} */ ;
/** @type {__VLS_StyleScopedClasses['folderControll']} */ ;
/** @type {__VLS_StyleScopedClasses['privateFolderName']} */ ;
/** @type {__VLS_StyleScopedClasses['privateNoteName']} */ ;
/** @type {__VLS_StyleScopedClasses['addNote']} */ ;
/** @type {__VLS_StyleScopedClasses['notshowNote']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            FilePage: FilePage,
            folderlist: folderlist,
            notelist: notelist,
            TheNote: TheNote,
            TheNav: TheNav,
            FolderNow: FolderNow,
            inputFileName: inputFileName,
            showCreateFile: showCreateFile,
            showsidebar: showsidebar,
            notShowNote: notShowNote,
            openSideBar: openSideBar,
            closeTheSideBar: closeTheSideBar,
            clickFolder: clickFolder,
            clickNote: clickNote,
            createNote: createNote,
            createDir: createDir,
            showCreateDir: showCreateDir,
            inputDirName: inputDirName,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

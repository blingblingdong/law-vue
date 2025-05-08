import MyFile from './components/MyFile.vue';
import GalleryPage from './components/GalleryPage.vue';
import LawSourcePage from './components/LawSourcePage.vue';
import Library from './components/library.vue';
import { ref, onMounted, watch } from 'vue';
import Account from './Account.vue';
const dataOption = ref();
const urltogallery = ref(null);
import { useUiStore, useAccountStore } from './store/page.ts';
import { nextTick } from 'vue';
const ui = useUiStore();
import { getApiUrl } from './utils/api';
import { Library as LibraryIcon, NotebookPen as NotebookIcon, BookText as BookTextIcon, Folder as FolderIcon } from 'lucide-vue-next';
const ApiLink = getApiUrl();
document.addEventListener('keydown', function (event) {
    // 例如，如果用戶按下 Ctrl+D
    if (event.ctrlKey && event.key === 's') {
        ui.currentPage = "查詢";
        event.preventDefault(); // 阻止預設行為，例如阻止書籤對話框的出現
        // 在這裡添加更多的動作，如打開自訂對話框等
    }
    else if (event.ctrlKey && event.key === 'n') {
        ui.currentPage = "資料夾";
        event.preventDefault();
    }
});
onMounted(async () => {
    try {
        const res = await fetch(`${ApiLink}/lawnamelist`);
        dataOption.value = await res.json();
    }
    catch (error) {
        console.error('API 請求失敗：', error);
    }
});
let account = useAccountStore();
onMounted(async () => {
    // 1.先看看localstorage，用戶有無登入過
    let user = localStorage.getItem("username");
    let email = localStorage.getItem("email");
    if (user && email) {
        //1.尋找令牌
        account.username = user;
        account.email = email;
        await account.find_token(ApiLink);
        await nextTick();
        if (!account.loginflag) {
            ui.currentPage = "用戶";
        }
    }
});
const urlParams = new URLSearchParams(window.location.search);
const userid = urlParams.get('user');
const directory = urlParams.get('dir');
const file_name = urlParams.get('file_name');
const lawname = urlParams.get('lawname');
const oldinter = urlParams.get('oldinter');
if (lawname) {
    ui.goToLawPage(lawname);
}
if (userid && directory && file_name) {
    ui.goToFile(`${userid}-${directory}-${file_name}`);
}
if (oldinter) {
    ui.goToOldInter(oldinter);
}
const activecolor = (page) => {
    const color = page === ui.currentPage ? 'var(--primary-color)' : 'var(--text-color)';
    return color;
};
const showsidebar = ref(true);
const picture = () => {
    if (account.loginflag) {
        return `/${account.picture}.png`;
    }
    else {
        return `/dog訪客.png`;
    }
};
const clickfolder = () => {
    if (!account.loginflag) {
        window.swal("Please log in or sign up to create notes.", {
            buttons: ["Stay as Visitor", "Log In"]
        })
            .then((value) => {
            if (value) {
                ui.currentPage = '用戶';
            }
        });
    }
    else {
        ui.currentPage = '資料夾';
    }
};
const clickLibarary = () => {
    if (!account.loginflag) {
        window.swal("Please log in or sign up to create notes.", {
            buttons: ["Stay as Visitor", "Log In"]
        })
            .then((value) => {
            if (value) {
                ui.currentPage = '用戶';
            }
        });
    }
    else {
        ui.currentPage = '圖書館';
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['searchicon']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['main-li']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['main-li']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "realbody",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "thesidebar",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.showsidebar) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.ui.currentPage = '用戶';
        } },
    src: (__VLS_ctx.picture()),
    id: 'user-png',
    ...{ class: 'user-btn catpng' },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "pagelist",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "searchicon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.ui.currentPage = '查詢';
        } },
    ...{ class: "fa-solid fa-magnifying-glass" },
    ...{ style: ({ color: __VLS_ctx.activecolor('查詢') }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "searchicon" },
});
const __VLS_0 = {}.NotebookIcon;
/** @type {[typeof __VLS_components.NotebookIcon, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    ...{ style: ({ color: __VLS_ctx.activecolor('資料夾') }) },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    ...{ style: ({ color: __VLS_ctx.activecolor('資料夾') }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (...[$event]) => {
        __VLS_ctx.clickfolder();
    }
};
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "searchicon" },
});
const __VLS_8 = {}.LibraryIcon;
/** @type {[typeof __VLS_components.LibraryIcon, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    size: (24),
    ...{ style: ({ color: __VLS_ctx.activecolor('畫廊') }) },
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    size: (24),
    ...{ style: ({ color: __VLS_ctx.activecolor('畫廊') }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (...[$event]) => {
        __VLS_ctx.ui.currentPage = '畫廊';
    }
};
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "searchicon" },
});
const __VLS_16 = {}.FolderIcon;
/** @type {[typeof __VLS_components.FolderIcon, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ 'onClick': {} },
    ...{ style: ({ color: __VLS_ctx.activecolor('圖書館') }) },
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
    ...{ style: ({ color: __VLS_ctx.activecolor('圖書館') }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (...[$event]) => {
        __VLS_ctx.clickLibarary();
    }
};
var __VLS_19;
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "searchicon" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showsidebar = false;
        } },
    ...{ class: "fa-solid fa-xmark" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "main-content",
});
if (__VLS_ctx.dataOption) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.datalist, __VLS_intrinsicElements.datalist)({
        id: "law-name-data",
    });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.dataOption))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({});
        (item.name);
    }
}
/** @type {[typeof LawSourcePage, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(LawSourcePage, new LawSourcePage({}));
const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.ui.currentPage === '查詢') }, null, null);
/** @type {[typeof MyFile, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(MyFile, new MyFile({}));
const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.ui.currentPage === '資料夾') }, null, null);
/** @type {[typeof Account, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(Account, new Account({}));
const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.ui.currentPage === '用戶') }, null, null);
/** @type {[typeof GalleryPage, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(GalleryPage, new GalleryPage({
    TheUrl: (__VLS_ctx.urltogallery),
}));
const __VLS_34 = __VLS_33({
    TheUrl: (__VLS_ctx.urltogallery),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.ui.currentPage === '畫廊') }, null, null);
/** @type {[typeof Library, ]} */ ;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(Library, new Library({}));
const __VLS_37 = __VLS_36({}, ...__VLS_functionalComponentArgsRest(__VLS_36));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.ui.currentPage === '圖書館') }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showsidebar = true;
        } },
    ...{ class: "fa-solid fa-bars" },
    id: "bars",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.showsidebar) }, null, null);
/** @type {__VLS_StyleScopedClasses['user-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['catpng']} */ ;
/** @type {__VLS_StyleScopedClasses['searchicon']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-magnifying-glass']} */ ;
/** @type {__VLS_StyleScopedClasses['searchicon']} */ ;
/** @type {__VLS_StyleScopedClasses['searchicon']} */ ;
/** @type {__VLS_StyleScopedClasses['searchicon']} */ ;
/** @type {__VLS_StyleScopedClasses['searchicon']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-xmark']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-bars']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MyFile: MyFile,
            GalleryPage: GalleryPage,
            LawSourcePage: LawSourcePage,
            Library: Library,
            Account: Account,
            dataOption: dataOption,
            urltogallery: urltogallery,
            ui: ui,
            LibraryIcon: LibraryIcon,
            NotebookIcon: NotebookIcon,
            FolderIcon: FolderIcon,
            activecolor: activecolor,
            showsidebar: showsidebar,
            picture: picture,
            clickfolder: clickfolder,
            clickLibarary: clickLibarary,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

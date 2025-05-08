import { computed } from 'vue';
export async function loadLaw(chapter, num, ApiUrl) {
    try {
        const response = await fetch(`${ApiUrl}/one_law/${chapter}/${num}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // 假設回應是 JSON 格式
        // 利用型別斷言將 data 當成 Law
        return data;
    }
    catch (error) {
        console.error("Error:", error);
        return null;
    }
}
/**
 * 根據原始的 lines 陣列生成處理後的資料
 * @param lines - 原始字串陣列
 */
export function useProcessedLines(lines) {
    const processedLines = computed(() => lines.value.map(text => {
        // 例如：如果文字開頭是全形空格，則認為需要縮排
        const isIndent = text.startsWith(" ");
        return {
            text: text.trim(),
            isIndent,
        };
    }));
    return { processedLines };
}
export async function get_all_lawList(chapter, ApiLink) {
    try {
        const response = await fetch(`${ApiLink}/all_lawList/${chapter}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // 利用型別斷言將 data 當成 Law
        return data;
    }
    catch (error) {
        console.error("Error:", error);
        return null;
    }
}
export async function getChapterList(chapter, ApiLink) {
    try {
        const response = await fetch(`${ApiLink}/allChapter/${chapter}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // 假設回應是 JSON 格式
        // 利用型別斷言將 data 當成 Law
        return data;
    }
    catch (error) {
        console.error("Error:", error);
        return null;
    }
}
export async function getHistoryLaw(ApiLink, lawid) {
    try {
        const response = await fetch(`${ApiLink}/historylaw/${lawid}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // 假設回應是 JSON 格式
        // 利用型別斷言將 data 當成 Law
        return data;
    }
    catch (error) {
        console.error("Error:", error);
        return null;
    }
}
export async function get_chapter_lawList(chapter1, chapter2, ApiLink) {
    const chapterData = { chapter1: chapter1, chapter2: chapter2 };
    const res = await fetch(`${ApiLink}/lawList_by_chapter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(chapterData),
    });
    const data = await res.json();
    return data;
}
export async function load_chapter_datalist(chapter, ApiLink) {
    let list = "";
    try {
        // 如果 response 有回傳數據且你需要使用的話
        let response = await fetch(`${ApiLink}/input_chapter/${chapter}`, {
            method: 'GET',
        });
        list = await response.text();
    }
    catch (error) {
        if (error instanceof Error) {
            // 現在 TypeScript 知道這是一個 Error 對象，可以安全地訪問 .message 屬性
            console.log("Error: " + error.message);
        }
        else {
            // 如果錯誤不是 Error 對象，處理其他類型的錯誤或記錄通用錯誤信息
            console.log("Error: ", error);
        }
    }
    return list;
}
export async function SSRLaw(chapter, num) {
    try {
        let res = await fetch(`https://nodessr-production.up.railway.app/render-law/${chapter}/${num}`);
        if (res.ok) {
            return res.text();
        }
    }
    catch (error) {
        console.log("FetchSSR Law Error: ", error);
    }
    return null;
}
export function to_history_link(chapter, num) {
    const lawIDMap = {
        民法: "FL001351",
        中華民國刑法: "FL001424",
    };
    const getLawID = (type) => {
        return lawIDMap[type];
    };
    return `https://mojlaw.moj.gov.tw/LawContentExtentHistory.aspx?LSID=${getLawID(chapter)}&LawNo=${num}`;
}
;

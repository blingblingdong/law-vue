export async function get_every_note(ApiLink) {
    let list = null;
    try {
        let response = await fetch(`${ApiLink}/every_notes`, {
            method: 'GET',
        });
        list = await response.json();
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error: " + error.message);
        }
        else {
            // 如果錯誤不是 Error 對象，處理其他類型的錯誤或記錄通用錯誤信息
            console.log("Error: ", error);
        }
    }
    return list;
}
export async function get_note_list(ApiLink, writer, folder) {
    let list = null;
    try {
        let response = await fetch(`${ApiLink}/note_list/${writer}/${folder}`, {
            method: 'GET',
        });
        list = await response.json();
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error: " + error.message);
        }
        else {
            // 如果錯誤不是 Error 對象，處理其他類型的錯誤或記錄通用錯誤信息
            console.log("Error: ", error);
        }
    }
    return list;
}
export async function get_note(ApiLink, userName, folderName, noteName) {
    try {
        const response = await fetch(`${ApiLink}/note/${userName}-${folderName}-${noteName}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        ;
        const fetchedNote = await response.json();
        return fetchedNote;
    }
    catch (error) {
        console.error('Failed to load note:', error);
        return null;
    }
}
export async function get_note_nav(ApiLink, id) {
    try {
        const response = await fetch(`${ApiLink}/note_nav/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Failed to load note:', error);
        return null;
    }
}
export async function update_note_state(ApiLink, id, state) {
    try {
        const response = await fetch(`${ApiLink}/note_state/${id}/${state}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        else {
            return true;
        }
    }
    catch (error) {
        console.error('Failed to load note:', error);
        return false;
    }
}
export async function update_note_name(ApiLink, oldid, newname) {
    try {
        const response = await fetch(`${ApiLink}/note_name/${oldid}/${newname}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Failed to load note:', error);
        return null;
    }
}
export async function update_note(ApiLink, id, content) {
    try {
        let c = { content: content };
        let res = await fetch(`${ApiLink}/note/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(c),
        });
        if (res.ok) {
            const data = await res.json();
            return data;
        }
    }
    catch (error) {
        console.error('筆記更新失敗:', error);
        return null;
    }
    return null;
}
export async function update_note_date(ApiLink, id, date) {
    let res = await fetch(`${ApiLink}/date/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: date }),
    });
    if (res.ok) {
        return true;
    }
    return false;
}
export async function get_note_date(ApiLink, id) {
    const response = await fetch(`${ApiLink}/date/${id}`);
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return new Date(data);
}
export async function create_note(ApiLink, note) {
    let res = await fetch(`${ApiLink}/note`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
    if (res.ok) {
        return true;
    }
    return false;
}
export async function delete_note(ApiLink, id) {
    let res = await fetch(`${ApiLink}/note/${id}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        return true;
    }
    return false;
}
export async function SSR(note) {
    try {
        let res = await fetch("https://nodessr-production.up.railway.app/render-note", {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(note),
        });
        if (res.ok) {
            return res.text();
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('筆記更新失敗:', error);
    }
    return null;
}
export async function create_dir(ApiLink, user_name, directory) {
    let id = user_name + "-" + directory;
    const dir = { id: id, user_name: user_name, directory: directory, public: true, description: "簡介" };
    try {
        let res = await fetch(`${ApiLink}/dir`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dir),
        });
        if (res.ok) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("Error: ", error);
        return false;
    }
}

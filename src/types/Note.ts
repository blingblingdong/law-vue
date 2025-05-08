export interface Attributes {
  id?: string
  class?: string
  style?: string
  src?: string
  width?: string
  height?: string
}

export interface InlineNode {
  type: string
  text?: string
  attributes?: Attributes
  children?: InlineNode[]
}

export interface Block {
  type: string
  attributes?: Attributes
  children?: InlineNode[]
  data?: LawCard;
}

export interface Line {
  line_type: string,
  attributes?: Attributes,
  children?: InlineNode,
}

export interface LawCard {
  chapter: string,
  num: string,
  lines: Line[]
}

export interface Note {
  id: string
  content: Block[] | null
  user_name: string
  directory: string
  file_name: string
  footer: string | null
  public: boolean
}

export async function get_every_note(ApiLink: string): Promise<null | Note[]> {
  let list = null;
  try {
    let response = await fetch(`${ApiLink}/every_notes`, {
      method: 'GET',
    });
    list = await response.json() as Note[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error: " + error.message);
    } else {
      // 如果錯誤不是 Error 對象，處理其他類型的錯誤或記錄通用錯誤信息
      console.log("Error: ", error);
    }
  }
  return list
}

export async function get_note_list(ApiLink: string, writer: string, folder: string): Promise<null | string[]> {
  let list = null;
  try {
    let response = await fetch(`${ApiLink}/note_list/${writer}/${folder}`, {
      method: 'GET',
    });
    list = await response.json() as string[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error: " + error.message);
    } else {
      // 如果錯誤不是 Error 對象，處理其他類型的錯誤或記錄通用錯誤信息
      console.log("Error: ", error);
    }
  }
  return list
}

export async function get_note(ApiLink: string, userName: string, folderName: string, noteName: string): Promise<null | Note> {
  try {
    const response = await fetch(`${ApiLink}/note/${userName}-${folderName}-${noteName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    };
    const fetchedNote: Note = await response.json();
    return fetchedNote
  } catch (error) {
    console.error('Failed to load note:', error)
    return null
  }
}

export interface H2Nav {
  id: string,
  text: string,
  children?: H3Nav[],
}

export interface H3Nav {
  id: string,
  text: string,
}

export type UpdateContent = {
  content: string,
}

export async function get_note_nav(ApiLink: string, id: string): Promise<null | H2Nav[]> {
  try {
    const response = await fetch(`${ApiLink}/note_nav/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data as H2Nav[];
  } catch (error) {
    console.error('Failed to load note:', error)
    return null
  }
}

export async function update_note_state(ApiLink: string, id: string, state: string): Promise<boolean> {
  try {
    const response = await fetch(`${ApiLink}/note_state/${id}/${state}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    } else {
      return true
    }

  } catch (error) {
    console.error('Failed to load note:', error)
    return false
  }
}

export async function update_note_name(ApiLink: string, oldid: string, newname: string): Promise<Note | null> {
  try {
    const response = await fetch(`${ApiLink}/note_name/${oldid}/${newname}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json();
    return data as Note

  } catch (error) {
    console.error('Failed to load note:', error)
    return null
  }
}



export async function update_note(ApiLink: string, id: string, content: string): Promise<null | Note> {
  try {
    let c = { content: content }
    let res = await fetch(`${ApiLink}/note/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(c),
    });
    if (res.ok) {
      const data = await res.json();
      return data as Note;
    }
  } catch (error) {
    console.error('筆記更新失敗:', error);
    return null
  }
  return null;
}

export async function update_note_date(ApiLink: string, id: String, date: String): Promise<boolean> {
  let res = await fetch(`${ApiLink}/date/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date: date }),
  });
  if (res.ok) {
    return true
  }
  return false
}

export async function get_note_date(ApiLink: string, id: String): Promise<null | Date> {
  const response = await fetch(`${ApiLink}/date/${id}`);
  if (!response.ok) {
    return null
  }
  const data = await response.json();
  return new Date(data);
}



export async function create_note(ApiLink: string, note: Note): Promise<boolean> {
  let res = await fetch(`${ApiLink}/note`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  if (res.ok) {
    return true
  }
  return false
}

export async function delete_note(ApiLink: string, id: String): Promise<boolean> {
  let res = await fetch(`${ApiLink}/note/${id}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    return true
  }
  return false
}

export async function SSR(note: Note): Promise<string | null> {
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
  } catch (error) {
    console.error('筆記更新失敗:', error);
  }
  return null;
}


export async function create_dir(ApiLink: string, user_name: string, directory: string): Promise<boolean> {
  let id = user_name + "-" + directory;
  const dir = { id: id, user_name: user_name, directory: directory, public: true, description: "簡介" }
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
    } else {
      return false
    }
  } catch (error) {
    console.log("Error: ", error);
    return false;
  }
}


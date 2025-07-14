export interface Folder {
  id: string, //(user_name + directory),
  user_name: string,
  directory: string,
  public: boolean,
  description: string,
  note_order: string[],
}

export interface UrlGallery {
  user_name: string,
  directory: string,
  page: string,
  file?: string,
}

export async function get_every_folders(ApiLink: string): Promise<null | Folder[]> {
  let list = null;
  try {
    let response = await fetch(`${ApiLink}/gallery`, {
      method: 'GET',
    });
    list = await response.json() as Folder[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      // 現在 TypeScript 知道這是一個 Error 對象，可以安全地訪問 .message 屬性
      console.log("Error: " + error.message);
    } else {
      // 如果錯誤不是 Error 對象，處理其他類型的錯誤或記錄通用錯誤信息
      console.log("Error: ", error);
    }
  }
  return list
}

export async function get_folder(ApiLink: string, writer: string, folderName: string): Promise<null | Folder> {
  let list = null;
  try {
    let response = await fetch(`${ApiLink}/dir_information/${writer}-${folderName}`, {
      method: 'GET',
    });
    list = await response.json() as Folder;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // 現在 TypeScript 知道這是一個 Error 對象，可以安全地訪問 .message 屬性
      console.log("Error: " + error.message);
    } else {
      // 如果錯誤不是 Error 對象，處理其他類型的錯誤或記錄通用錯誤信息
      console.log("Error: ", error);
    }
  }
  return list
}

export async function get_note_order(ApiLink: string, writer: string, folderName: string): Promise<null | string[]> {
  let list = null;
  try {
    let response = await fetch(`${ApiLink}/note_order/${writer}-${folderName}`, {
      method: 'GET',
    });
    list = await response.json() as string[];
  } catch (error: unknown) {
    if (error instanceof Error) {
      // 現在 TypeScript 知道這是一個 Error 對象，可以安全地訪問 .message 屬性
      console.log("Error: " + error.message);
    } else {
      // 如果錯誤不是 Error 對象，處理其他類型的錯誤或記錄通用錯誤信息
      console.log("Error: ", error);
    }
  }
  return list
}

export async function delete_folder(ApiLink: string, username: string, foldername: string): Promise<boolean> {
  let res = await fetch(`${ApiLink}/folder/${username}/${foldername}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    return true
  }
  return false
}



export async function update_note_order(ApiLink: string, userName: string, folderName: string, list: string[]): Promise<boolean> {
  try {
    let res = await fetch(`${ApiLink}/note_order/${userName}/${folderName}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(list),
    });
    if (res.ok) {
      return true
    }
  } catch (error) {
    console.error('筆記更新失敗:', error);
    return false
  }
  return false;
}

export async function update_dir_information(ApiLink: string, folder: Folder): Promise<Folder | null> {
  try {
    let res = await fetch(`${ApiLink}/dir`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(folder),
    });
    if (res.ok) {
      let j = await res.json();
      return j as Folder;
    }
  } catch (error) {
    console.error('筆記更新失敗:', error);
    return null
  }
  return null;
}























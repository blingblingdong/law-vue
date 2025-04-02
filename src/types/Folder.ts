export interface Folder {
  id: string, //(user_name + directory),
  user_name: string,
  directory: string,
  public: boolean,
  description: string,
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

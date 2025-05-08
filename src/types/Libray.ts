
export interface LibraryItem {
  id: string,
  item_library: string,
  item_id: string,
  item_type: string,
  item_name: string,
  order: number,
}

export interface Library {
  id: string,
  library_name: string,
  user_name: string,
  public: boolean,
}

export async function get_library(ApiLink: string, userName: string): Promise<null | Library[]> {
  try {
    const response = await fetch(`${ApiLink}/library/${userName}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    };
    const fetchedLibrary: Library[] = await response.json();
    return fetchedLibrary
  } catch (error) {
    console.error('Failed to load note:', error)
    return null
  }
}

export async function get_library_item(ApiLink: string, library_id: string): Promise<null | LibraryItem[]> {
  try {
    const response = await fetch(`${ApiLink}/library_item/${library_id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    };
    const fetchedLibraryItem: LibraryItem[] = await response.json();
    return fetchedLibraryItem
  } catch (error) {
    console.error('Failed to load note:', error)
    return null
  }
}

export async function create_Library(ApiLink: string, library_name: string, user_name: string): Promise<boolean> {
  try {
    let res = await fetch(`${ApiLink}/library/${user_name}/${library_name}`, {
      method: 'POST',
    });
    if (res.ok) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Failed to load note:', error)
    return false
  }

}

export async function create_Library_item(ApiLink: string, library_id: string, item_id: string, item_type: string, item_name: string): Promise<boolean> {
  try {
    let res = await fetch(`${ApiLink}/library_item/${library_id}/${item_id}/${item_type}/${item_name}`, {
      method: 'POST',
    });
    if (res.ok) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Failed to load note:', error)
    return false
  }

}




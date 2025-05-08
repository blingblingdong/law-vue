export async function get_library(ApiLink, userName) {
    try {
        const response = await fetch(`${ApiLink}/library/${userName}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        ;
        const fetchedLibrary = await response.json();
        return fetchedLibrary;
    }
    catch (error) {
        console.error('Failed to load note:', error);
        return null;
    }
}
export async function get_library_item(ApiLink, library_id) {
    try {
        const response = await fetch(`${ApiLink}/library_item/${library_id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        ;
        const fetchedLibraryItem = await response.json();
        return fetchedLibraryItem;
    }
    catch (error) {
        console.error('Failed to load note:', error);
        return null;
    }
}
export async function create_Library(ApiLink, library_name, user_name) {
    try {
        let res = await fetch(`${ApiLink}/library/${user_name}/${library_name}`, {
            method: 'POST',
        });
        if (res.ok) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error('Failed to load note:', error);
        return false;
    }
}
export async function create_Library_item(ApiLink, library_id, item_id, item_type, item_name) {
    try {
        let res = await fetch(`${ApiLink}/library_item/${library_id}/${item_id}/${item_type}/${item_name}`, {
            method: 'POST',
        });
        if (res.ok) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error('Failed to load note:', error);
        return false;
    }
}

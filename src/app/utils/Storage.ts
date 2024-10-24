import {Task, TaskList} from "@/app/Models/Task";

const LOCAL_STORAGE_PREFIX = "tm";

enum localstorage_keys {
    THEME = `${LOCAL_STORAGE_PREFIX}_THEME`,
    LISTS = `${LOCAL_STORAGE_PREFIX}_LISTS`,
    BACKGROUND = `${LOCAL_STORAGE_PREFIX}_BACKGROUND`,
}

/**
 * Gets the browser's preferred theme setted by the user
 * @returns {"dark" | "light"}
 */
function getSystemTheme(): 'dark' | 'light' {
    let preferredTheme: 'dark' | 'light';
    if(window.matchMedia !== undefined){ //if browser support matchMedia

        //Assign the system preferred theme
        preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    else{
        preferredTheme = 'light';
    }

    return preferredTheme;
}

/**
 * Gets the preferred theme by the user in the localStorage, if it does not
 * exists, it will get the system theme
 * @returns {"dark" | "light"}
 */
export function getPreferredTheme(): 'dark'| 'light'{
    const preferredTheme = localStorage.getItem(localstorage_keys.THEME);


    if(!preferredTheme){ //if there is not preferred theme in the local storage
        const newTheme = getSystemTheme();

        setPreferredTheme(newTheme);
        return newTheme;
    }

    return preferredTheme as 'dark' | 'light'
    
}

/**
 * Saves the preferred theme into the localStorage
 * @param {"dark" |"light"} theme theme to be stored
 */
export function setPreferredTheme(theme: 'light' | 'dark'): void{
    localStorage.setItem(localstorage_keys.THEME, theme);
}

/**
 * Get from the localStorage the list of TaskList saved, if it does
 * not exists, then it will save and return an empty array
 * @returns {TaskList[]} - the TaskLists saved on the localStorage
 */
export function getTaskLists(): TaskList[]{
    const tasksLists = localStorage.getItem(localstorage_keys.LISTS);

    if(!tasksLists){
        setTaskLists([]);
        return [];
    }

    const parsedList: string[] = JSON.parse(tasksLists) as string[];

    return parsedList.map((list: string) => TaskList.parse(list));
}

/**
 * Saves in the localStorage the list of TaskLists that are passed as parameter
 * @param {TaskList[]} taskLists - the list of TaskList to be saved
 * @returns {TaskList[]} - the result of the TaskLists saved on the LocalStorage
 */
export function setTaskLists(taskLists: TaskList[]): TaskList[] {
    const convertedToString: string[] = taskLists.map(list => list.toString());
    localStorage.setItem(localstorage_keys.LISTS, JSON.stringify(convertedToString));
    return getTaskLists();
}

/**
 * Adds a Tasklist to the LocalStorage
 * @param {TaskList} list - the list to be added
 * @returns {TaskList[]} - the result of the stored lists
 */
export function saveNewTaskList(list: TaskList): TaskList[]{
    const lists = getTaskLists();
    lists.push(list);
    setTaskLists(lists);

    return lists;
}

/**
 * Removes a TaskList from the localStorage
 * @param {string} id - id from the TaskList to be deleted
 * @returns {TaskList[]} - remaining lists
 */
export function deleteTaskList(id: string): TaskList[]{
    let lists = getTaskLists();

    lists = lists.filter(list => {
        return list.getId() !== id;
    });
    setTaskLists(lists);
    return getTaskLists();
}

/**
 * Gets the image url from the localStorage, if it does not exists it will
 * save and return a default image
 * @returns {string} - the image url saved on the localStorage
 */
export function getBackground(): string{
    const background = localStorage.getItem(localstorage_keys.BACKGROUND);


    if(!background){
        const newBg = "https://images.unsplash.com/photo-1489914099268-1dad649f76bf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

        setBackground(newBg);
        return newBg;
    }

    return background;
    
}

/**
 * Saves an image url into the local Storage
 * @param {string} background - image url to be saved into the localStorage
 */
export function setBackground(background: string): void{
    localStorage.setItem(localstorage_keys.BACKGROUND, background);
}

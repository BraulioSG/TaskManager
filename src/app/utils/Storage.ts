import {Task, TaskList} from "@/app/Models/Task";

const LOCAL_STORAGE_PREFIX = "tm";

enum localstorage_keys {
    THEME = `${LOCAL_STORAGE_PREFIX}_THEME`,
    LISTS = `${LOCAL_STORAGE_PREFIX}_LISTS`,
}

//THEMES
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

export function getPreferredTheme(): 'dark'| 'light'{
    const preferredTheme = localStorage.getItem(localstorage_keys.THEME);


    if(!preferredTheme){ //if there is not preferred theme in the local storage
        const newTheme = getSystemTheme();

        setPreferredTheme(newTheme);
        return newTheme;
    }

    return preferredTheme as 'dark' | 'light'
    
}

export function setPreferredTheme(theme: 'light' | 'dark'): void{
    localStorage.setItem(localstorage_keys.THEME, theme);
}


//LISTS
export function getTaskLists(): TaskList[]{
    const tasksLists = localStorage.getItem(localstorage_keys.LISTS);

    if(!tasksLists){
        setTaskLists([]);
        return [];
    }

    const parsedList: string[] = JSON.parse(tasksLists) as string[];

    return parsedList.map((list: string) => TaskList.parse(list));
}

export function setTaskLists(taskLists: TaskList[]): void{
    const convertedToString: string[] = taskLists.map(list => list.toString());
    localStorage.setItem(localstorage_keys.LISTS, JSON.stringify(convertedToString));
}

export function saveNewTaskList(list: TaskList): TaskList[]{
    const lists = getTaskLists();
    lists.push(list);
    setTaskLists(lists);

    return lists;
}
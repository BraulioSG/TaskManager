import {DefaultThemes, Theme} from "@/app/Models/Themes";
import {Task, TaskList} from "@/app/Models/Task";

const LOCAL_STORAGE_PREFIX = "tm";

enum localstorage_keys {
    THEME = `${LOCAL_STORAGE_PREFIX}_THEME`,
    LISTS = `${LOCAL_STORAGE_PREFIX}_LISTS`,
}

//THEMES
function getSystemTheme(): Theme{
    let preferredTheme: string;
    if(window.matchMedia !== undefined){ //if browser support matchMedia

        //Assign the system preferred theme
        preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? DefaultThemes.DARK.toString() : DefaultThemes.LIGHT.toString();
    }
    else{
        preferredTheme = DefaultThemes.LIGHT.toString();
    }

    return Theme.parseTheme(preferredTheme);
}

export function getPreferredTheme(): Theme{
    const preferredTheme = localStorage.getItem(localstorage_keys.THEME);


    if(!preferredTheme){ //if there is not preferred theme in the local storage
        const newTheme = getSystemTheme();

        setPreferredTheme(newTheme);
        return newTheme;
    }

    try{
        const theme: Theme = Theme.parseTheme(preferredTheme);
        setPreferredTheme(theme);
        return theme;
    }catch(_){
        const newTheme = getSystemTheme();

        setPreferredTheme(newTheme);
        return newTheme;
    }

}

export function setPreferredTheme(theme: Theme): void{
    localStorage.setItem(localstorage_keys.THEME, theme.toString());
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
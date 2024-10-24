import {Task, TaskList} from "@/app/Models/Task";

const LOCAL_STORAGE_PREFIX = "tm";

enum localstorage_keys {
    THEME = `${LOCAL_STORAGE_PREFIX}_THEME`,
    LISTS = `${LOCAL_STORAGE_PREFIX}_LISTS`,
    BACKGROUND = `${LOCAL_STORAGE_PREFIX}_BACKGROUND`,
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

export function setTaskLists(taskLists: TaskList[]): TaskList[] {
    const convertedToString: string[] = taskLists.map(list => list.toString());
    localStorage.setItem(localstorage_keys.LISTS, JSON.stringify(convertedToString));
    return getTaskLists();
}

export function saveNewTaskList(list: TaskList): TaskList[]{
    const lists = getTaskLists();
    lists.push(list);
    setTaskLists(lists);

    return lists;
}

export function deleteTaskList(id: string): TaskList[]{
    let lists = getTaskLists();

    lists = lists.filter(list => {
        return list.getId() !== id;
    });
    setTaskLists(lists);
    return getTaskLists();
}

//background

export function getBackground(): string{
    const background = localStorage.getItem(localstorage_keys.BACKGROUND);


    if(!background){ //if there is not preferred theme in the local storage
        const newBg = "https://images.unsplash.com/photo-1489914099268-1dad649f76bf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

        setBackground(newBg);
        return newBg;
    }

    return background;
    
}

export function setBackground(background: string): void{
    localStorage.setItem(localstorage_keys.BACKGROUND, background);
}

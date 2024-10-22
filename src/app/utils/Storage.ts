import {DefaultThemes, Theme} from "@/app/Models/Themes";

const LOCAL_STORAGE_PREFIX = "tm";

enum localstorage_keys {
    THEME = `${LOCAL_STORAGE_PREFIX}_THEME`,
}

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


    console.log(DefaultThemes.DARK);
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
function getFromStorage(key: string, defaultValue?: object): object{
    let value: string | undefined = localStorage.getItem(key);

    if(value === undefined){
        if(defaultValue === undefined){
            return {};
        }
        let stringified: string = JSON.stringify(defaultValue);
        localStorage.setItem(key, stringified);
        value = stringified;
    }else{

    }

    try{
        return JSON.parse(value);
    }catch (e) {
        //value cannot be parsed
        return {};
    }
}

export function getUserData(){

}
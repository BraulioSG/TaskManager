/**
 * Generates an id based on a string, currentTime and random numbers
 * @param str base for the id generation
 * @returns a random string that can be used as an ID
 */
export function generateID(str: string):string{

    const now = new Date();
    const millis = now.getMilliseconds();

    const millisTxt = millis.toString();
    
    let res = millisTxt[0] + millisTxt[1] + millisTxt[2];

    let n = 20;
    for(let i = str.length; i < n; i++){
        str += "abcdefghijklmnopqrstuvwxyz".at(Math.round(Math.random() * 24));
    }
    

    for(let i = 0; i < n; i++){

        let code = str.charCodeAt(i);
        let k = code * millis;


        if( (k + 1) % str.length === 0){
            res += str[i];
        }
        else{
            res += k.toString()[0];
        }
    }

    res += millisTxt[millisTxt.length - 1] + millisTxt[millisTxt.length - 2] + millisTxt[millisTxt.length - 3]

    return res;
}
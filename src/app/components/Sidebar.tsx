import {useEffect} from "react";
import {getPreferredTheme} from "@/app/utils/Storage";

export default function Sidebar(){
    //TESTING THE STORAGE
    useEffect(() => {
        const theme = getPreferredTheme();

        console.log(theme);
    }, []);
    return (
        <>
            <p>Sidebar</p>
        </>
    )
}
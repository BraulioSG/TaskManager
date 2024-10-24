import "./Toolbar.scss"

import ThemeToggler from "./ThemeToggler"
import { useEffect } from "react"
import { getBackground, setBackground } from "../utils/Storage";

export default function Toolbar({ setTheme }: any) {

    useEffect(() => {
        const body = document.querySelector(".main-container") as HTMLElement;
        body.style.backgroundImage = `url("${getBackground()}")`;
    }, [])

    /**
     * updates the background with a window prompt
     */
    const handleBackgroundChange = () => {
        let newBackground = window.prompt("Insert the URL of the background you want");

        if (newBackground) {
            const body = document.querySelector(".main-container") as HTMLElement;
            body.style.backgroundImage = `url("${newBackground}")`;
            setBackground(newBackground);
        } else {
            console.log("No URL provided");
        }
    }

    return (
        <div className="Toolbar">
            <ThemeToggler setTheme={setTheme} />
            <button className="changeBg" onClick={handleBackgroundChange}>Change background</button>
        </div>
    )
}
import "./Toolbar.scss"

import { useContext, useEffect } from "react"
import { getBackground, setBackground } from "../utils/Storage";
import { ThemeContext } from "../page";

import ThemeToggler from "./ThemeToggler"
export default function Toolbar() {

    const { theme, setTheme } = useContext(ThemeContext)

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
            <ThemeToggler />
            <button className="changeBg" onClick={handleBackgroundChange}>Change background</button>
        </div>
    )
}
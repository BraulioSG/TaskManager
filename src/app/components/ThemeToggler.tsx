import "./ThemeToggler.scss"

import { useContext } from "react"
import { ThemeContext } from "../page";

import { TiWeatherNight, TiWeatherSunny } from "react-icons/ti";
import { setPreferredTheme } from "../utils/Storage";



export default function ThemeToggler() {
    const { theme, setTheme } = useContext(ThemeContext);

    /**
     * updates the theme and save it to the localStorage
     */
    const handleToggleTheme = () => {
        let newTheme: "dark" | "light" = theme === "dark" ? "light" : "dark";
        setPreferredTheme(newTheme as "light" | "dark");
        setTheme(newTheme);
    }
    return (
        <button className={`ThemeToggler ${theme}`} onClick={handleToggleTheme}>
            <span>
                {theme === "dark" && <TiWeatherNight />}
                {theme === "light" && <TiWeatherSunny />}
            </span>
        </button>
    )
}
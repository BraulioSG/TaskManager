import "./ThemeToggler.scss"

import { useContext } from "react"
import { ThemeContext } from "../page";

import { TiWeatherNight, TiWeatherSunny } from "react-icons/ti";
import { setPreferredTheme } from "../utils/Storage";



export default function ThemeToggler({ setTheme }: any) {
    const theme = useContext(ThemeContext);

    /**
     * updates the theme and save it to the localStorage
     */
    const handleToggleTheme = () => {
        setTheme((prev: "dark" | "light") => {
            let newTheme = prev === "dark" ? "light" : "dark";
            setPreferredTheme(newTheme as "light" | "dark");
            return newTheme;
        })
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
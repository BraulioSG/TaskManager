import "./ThemeToggler.scss"

import { useContext } from "react"
import { ThemeContext } from "../page";

import { TiWeatherNight, TiWeatherSunny } from "react-icons/ti";



export default function ThemeToggler({ setTheme }: any) {
    const theme = useContext(ThemeContext);

    const handleToggleTheme = () => {
        setTheme((prev: "dark" | "light") => {
            return prev === "dark" ? "light" : "dark";
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
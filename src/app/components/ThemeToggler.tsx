import { useContext } from "react"
import "./ThemeToggler.scss"
import { ThemeContext } from "../page";

export default function ThemeToggler({ setTheme }: any) {
    const theme = useContext(ThemeContext);

    const handleToggleTheme = () => {
        setTheme((prev: "dark" | "light") => {
            return prev === "dark" ? "light" : "dark";
        })
    }
    return (
        <button className="ThemeToggler" onClick={handleToggleTheme}>{theme} mode</button>
    )
}
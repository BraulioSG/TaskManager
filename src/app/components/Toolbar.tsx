import "./Toolbar.scss"

import ThemeToggler from "./ThemeToggler"

export default function Toolbar({ setTheme }: any) {
    return (
        <div className="Toolbar">
            <ThemeToggler setTheme={setTheme} />
        </div>
    )
}
const HEX_PATTERN = new RegExp('^#([0-9]|[a-f]|[A-F]){6}$')

/**
 * Defines a color Theme for the app
 */
class Theme {
    public name: string;

    private foreground: string;
    private background: string;
    private primary: string;
    private secondary: string;
    private accent: string;

    /**
     * Constructor of Theme
     * @param foreground    color of the text
     * @param background    color of the background
     * @param primary       primary color
     * @param secondary     secondary color
     * @param accent        accent color
     */
    constructor(name: string, foreground?: string, background?: string, primary?: string, secondary?: string, accent?: string) {
        this.name = name;
        //Default Theme -> Light Theme
        this.setForeground(foreground as string);
        this.setBackground(background as string);
        this.setPrimary(primary as string);
        this.setSecondary(secondary as string);
        this.setAccent(accent as string);
    }

    /**
     * Returns a format that can be stored in the local storage
     */
    public toString(): string{
        return JSON.stringify({
            name: this.name,
            colors: {
                foreground: this.foreground,
                background: this.background,
                primary: this.primary,
                secondary: this.secondary,
                accent: this.accent,
            }
        });
    }

    public static isHex(color: string): boolean {
        //return true;
        return HEX_PATTERN.test(color);
    }


    /**
     *
     * @param theme a string JSON formated
     */
    public static parseTheme(theme: string): Theme {
        const jsonObject = JSON.parse(theme);

        const { name, colors } = jsonObject;
        const { foreground, background, primary, secondary, accent } = colors;

        return new Theme(name, foreground, background, primary, secondary, accent);
    }

    //SETTERS
    /**
     * Sets the foreground color
     * @param color a string with 6 character hex format (0-9) || (A-F), is not case-sensitive
     */
    public setForeground(color: string) {
        this.foreground = Theme.isHex(color) ? color : "#080d06";
    }

    /**
     * Sets the background color
     * @param color a string with 6 character hex format (0-9) || (A-F), is not case-sensitive
     */
    public setBackground(color: string) {
        this.background = Theme.isHex(color) ? color : "#f9fcf7";

    }

    /**
     * Sets the accent color
     * @param color a string with 6 character hex format (0-9) || (A-F), is not case-sensitive
     */
    public setPrimary(color: string) {
        this.primary = Theme.isHex(color) ? color : "#64c345";
    }

    /**
     * Sets the secondary color
     * @param color a string with 6 character hex format (0-9) || (A-F), is not case-sensitive
     */
    public setSecondary(color: string) {
        this.secondary = Theme.isHex(color) ? color : "#ace49a";
    }

    /**
     * Sets the accent color
     * @param color a string with 6 character hex format (0-9) || (A-F), is not case-sensitive
     */
    public setAccent(color: string) {
        this.accent = Theme.isHex(color) ? color : "#84dd67";

    }

    //GETTERS
    public getForeground(){ return this.foreground; }

    public getBackground(){ return this.background; }

    public getPrimary(){ return this.primary; }

    public getSecondary(){ return this.secondary; }

    public getAccent(){ return this.accent; }
}


const DefaultThemes = {
    "DARK" : new Theme("dark"),
    "LIGHT" : new Theme("light"),
    "CUSTOM" : new Theme("custom"),
}


export { DefaultThemes, Theme };
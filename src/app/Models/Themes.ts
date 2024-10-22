const HEX_PATTERN = new RegExp('^#([0-9]?[a-f])$\i')

enum ThemeOptions {
    DARK = "Dark",
    LIGHT = "Light",
    CUSTOM = "Custom",
}

/**
 * Defines a color Theme for the app
 */
class Theme {
    private foreground: string = "";
    private background: string = "";
    private primary: string    = "";
    private secondary: string  = "";
    private accent: string     = "";

    /**
     * Constructor of Theme
     * @param foreground    color of the text
     * @param background    color of the background
     * @param primary       primary color
     * @param secondary     secondary color
     * @param accent        accent color
     */
    constructor(foreground?: string, background?: string, primary?: string, secondary?: string, accent?: string) {

        //Default Theme -> Light Theme
        this.setForeground(foreground   ?? "#080d06");
        this.setBackground(background   ?? "#f9fcf7");
        this.setPrimary(primary         ?? "#64c345");
        this.setSecondary(secondary     ?? "#ace49a");
        this.setAccent(accent           ?? "#84dd67");
    }

    public isHex(color: string): boolean {
        return HEX_PATTERN.test(color);
    }

    //SETTERS
    /**
     * Sets the foreground color
     * @param color a string with 6 character hex format (0-9) || (A-F), is not case-sensitive
     */
    public setForeground(color: string) {
        if(this.isHex(color)) {
            this.foreground = color;
        }else{
            throw new Error("Unsupported color format. (setForeground)");
        }
    }

    /**
     * Sets the background color
     * @param color a string with 6 character hex format (0-9) || (A-F), is not case-sensitive
     */
    public setBackground(color: string) {
        if(this.isHex(color)) {
            this.background = color;
        }
        else {
            throw new Error("Unsupported color format. (setBackground)");
        }
    }

    /**
     * Sets the accent color
     * @param color a string with 6 character hex format (0-9) || (A-F), is not case-sensitive
     */
    public setPrimary(color: string) {
        if(this.isHex(color)) {
            this.background = color;
        }
        else {
            throw new Error("Unsupported color format. (setPrimary)");
        }
    }

    /**
     * Sets the secondary color
     * @param color a string with 6 character hex format (0-9) || (A-F), is not case-sensitive
     */
    public setSecondary(color: string) {
        if(this.isHex(color)) {
            this.background = color;
        }
        else {
            throw new Error("Unsupported color format. (setSecondary)");
        }
    }

    /**
     * Sets the accent color
     * @param color a string with 6 character hex format (0-9) || (A-F), is not case-sensitive
     */
    public setAccent(color: string) {
        if(this.isHex(color)) {
            this.background = color;
        }
        else {
            throw new Error("Unsupported color format. (setAccent)");
        }
    }

    //GETTERS
    public getForeground(){ return this.foreground; }

    public getBackground(){ return this.background; }

    public getPrimary(){ return this.primary; }

    public getSecondary(){ return this.secondary; }

    public getAccent(){ return this.accent; }
}

export { ThemeOptions, Theme };
import { useState } from "react";

export enum SupportedTheme {
    Dark = "dark",
    Light = "light"
}

export function useTheme () {
    let defaultTheme = localStorage.getItem("theme") as SupportedTheme ?? SupportedTheme.Dark;

    let [theme, setTheme] = useState<SupportedTheme>(defaultTheme);

    function toggleTheme() {
        if (localStorage.getItem("theme") === SupportedTheme.Dark) {
            document.documentElement.classList.remove(SupportedTheme.Dark);
            localStorage.setItem("theme", SupportedTheme.Light);
            setTheme(SupportedTheme.Light);
        } else {
            document.documentElement.classList.add(SupportedTheme.Dark);
            localStorage.setItem("theme", SupportedTheme.Dark);
            setTheme(SupportedTheme.Dark);
        }
    }

    return {
        theme,
        toggleTheme
    }
}
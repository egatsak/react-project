import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../../../../shared/lib/context/ThemeContext";
import { Theme } from "@/shared/const/theme";
import { useJsonSettings } from "@/entities/User";
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localStorage";

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const fallbackTheme = window.localStorage.getItem(
    LOCAL_STORAGE_THEME_KEY,
) as Theme;

const ThemeProvider: FC<ThemeProviderProps> = ({ initialTheme, children }) => {
    const { theme: defaultTheme } = useJsonSettings();

    const [theme, setTheme] = useState<Theme>(
        initialTheme || fallbackTheme || Theme.LIGHT,
    );

    const [isThemeInited, setThemeInited] = useState(false);

    useEffect(() => {
        if (!isThemeInited && defaultTheme) {
            setTheme(defaultTheme);
            setThemeInited(true);
        }
    }, [defaultTheme, isThemeInited]);

    useEffect(() => {
        window.document.body.className = theme;
        window.localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, [theme]);

    const defaultProps = useMemo(() => ({ theme, setTheme }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

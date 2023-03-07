import { FC } from "react";
import { Theme, useTheme } from "app/providers/ThemeProvider";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { classNames } from "shared/lib/classNames/classNames";
import LightIcon from "shared/assets/icons/icon-theme-light.svg";
import DarkIcon from "shared/assets/icons/icon-theme-dark.svg";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
    const { className } = props;
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ThemeButton.CLEAR}
            className={classNames("", {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
};

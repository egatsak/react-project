import { memo } from "react";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { classNames } from "@/shared/lib/classNames/classNames";
import LightIcon from "@/shared/assets/icons/icon-theme-light.svg";
import DarkIcon from "@/shared/assets/icons/icon-theme-dark.svg";
import { Theme } from "@/shared/const/theme";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { className } = props;
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames("", {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    );
});

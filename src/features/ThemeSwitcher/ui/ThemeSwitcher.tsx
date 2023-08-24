import { memo, useCallback } from "react";

import { saveJsonSettings } from "@/entities/User";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import ThemeIcon from "@/shared/assets/icons/icon-theme-redesigned.svg";
import ThemeIconDeprecated from "@/shared/assets/icons/icon-theme-light.svg";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon/Icon";
import { ToggleFeatures } from "@/shared/lib/features";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { className } = props;
    const { toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [dispatch, toggleTheme]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />}
            off={
                <ButtonDeprecated
                    theme={ButtonTheme.CLEAR}
                    className={className}
                    onClick={onToggleHandler}
                >
                    <IconDeprecated
                        Svg={ThemeIconDeprecated}
                        width={40}
                        height={40}
                    />
                </ButtonDeprecated>
            }
        />
    );
});

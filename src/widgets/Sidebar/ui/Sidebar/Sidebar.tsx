import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { LangSwitcher } from "@/features/LangSwitcher";
import {
    Button,
    ButtonSize,
    ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { classNames } from "@/shared/lib/classNames/classNames";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";
import { SidebarItem } from "../SidebarItem/SidebarItem";

import styles from "./Sidebar.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { AppLogo } from "@/shared/ui/redesigned/AppLogo/AppLogo";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import ArrowIcon from "@/shared/assets/icons/icon-arrow-bottom-redesigned.svg";

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;
    const [collapsed, setCollapsed] = useState(false);

    const sidebarItemList = useSelector(getSidebarItems);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(
        () =>
            sidebarItemList.map((item) => (
                <SidebarItem
                    key={item.path}
                    item={item}
                    collapsed={collapsed}
                />
            )),
        [collapsed, sidebarItemList],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <section
                    data-testid="sidebar"
                    className={classNames(
                        styles.sidebarRedesigned,
                        { [styles.collapsedRedesigned]: collapsed },
                        [className],
                    )}
                >
                    <AppLogo
                        size={collapsed ? 30 : 50}
                        className={styles.appLogo}
                    />
                    <VStack role="navigation" gap="8" className={styles.items}>
                        {itemsList}
                    </VStack>
                    <Icon
                        Svg={ArrowIcon}
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        className={styles.collapseBtn}
                        clickable
                    />
                    <div className={styles.switchers}>
                        <ThemeSwitcher />
                        <LangSwitcher
                            short={collapsed}
                            className={styles.lang}
                        />
                    </div>
                </section>
            }
            off={
                <section
                    data-testid="sidebar"
                    className={classNames(
                        styles.sidebar,
                        { [styles.collapsed]: collapsed },
                        [className],
                    )}
                >
                    <Button
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        className={styles.collapseBtn}
                        theme={ButtonTheme.BACKGROUND_INVERTED}
                        size={ButtonSize.L}
                        square
                    >
                        {collapsed ? ">" : "<"}
                    </Button>
                    <VStack role="navigation" gap="8" className={styles.items}>
                        {itemsList}
                    </VStack>
                    <div className={styles.switchers}>
                        <ThemeSwitcher />
                        <LangSwitcher
                            short={collapsed}
                            className={styles.lang}
                        />
                    </div>
                </section>
            }
        />
    );
});

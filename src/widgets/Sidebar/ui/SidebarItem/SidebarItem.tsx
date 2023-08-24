import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";

import { classNames } from "@/shared/lib/classNames/classNames";
import {
    AppLink as AppLinkDeprecated,
    AppLinkTheme,
} from "@/shared/ui/deprecated/AppLink/AppLink";
import { SidebarItemType } from "../../model/types/sidebar";

import styles from "./SidebarItem.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { AppLink } from "@/shared/ui/redesigned/AppLink/AppLink";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { item, collapsed } = props;
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <AppLink
                    to={item.path}
                    className={classNames(styles.itemRedesigned, {
                        [styles.collapsedRedesigned]: collapsed,
                    })}
                    activeClassName={styles.active}
                >
                    <Icon Svg={item.icon} />
                    <span className={styles.link}>
                        {t(item.text, { ns: "translation" })}
                    </span>
                </AppLink>
            }
            off={
                <AppLinkDeprecated
                    theme={AppLinkTheme.SECONDARY}
                    to={item.path}
                    className={classNames(styles.item, {
                        [styles.collapsed]: collapsed,
                    })}
                >
                    <item.icon className={styles.icon} />
                    <span className={styles.link}>
                        {t(item.text, { ns: "translation" })}
                    </span>
                </AppLinkDeprecated>
            }
        />
    );
});

import { memo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { SidebarItemType } from "widgets/Sidebar/model/Items";
import styles from "./SidebarItem.module.scss";

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { item, collapsed } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(styles.sidebarItem, {})}>
            <AppLink
                theme={AppLinkTheme.SECONDARY}
                to={item.path}
                className={classNames(styles.item, {
                    [styles.collapsed]: collapsed,
                })}
            >
                <item.icon className={styles.icon} />
                <span className={styles.link}>{t(item.text)}</span>
            </AppLink>
        </div>
    );
});

import { FC } from "react";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { classNames } from "shared/lib/classNames/classNames";

import { useTranslation } from "react-i18next";
import styles from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(styles.navbar, {}, [className])}>
            <div className={styles.links}>
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to="/"
                    className={styles.mainLink}
                >
                    {t("Main", { ns: "translation" })}
                </AppLink>
                <AppLink theme={AppLinkTheme.GRAY} to="/about">
                    {t("About", { ns: "translation" })}
                </AppLink>
            </div>
        </div>
    );
};

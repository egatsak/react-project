import { FC } from "react";
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
            <div className={styles.links}>/</div>
        </div>
    );
};

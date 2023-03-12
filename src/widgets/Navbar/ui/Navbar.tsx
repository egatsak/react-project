import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoginModal } from "features/AuthByUsername";
import { Button, ButtonTheme } from "shared/ui/Button/Button";

import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const { t } = useTranslation();

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    return (
        <div className={classNames(styles.navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={styles.links}
                onClick={onShowModal}
            >
                {t("Log-in", { ns: "translation" })}
            </Button>
            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </div>
    );
};

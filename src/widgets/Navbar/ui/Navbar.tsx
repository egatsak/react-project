import { FC, useCallback, useState } from "react";
import { Modal } from "shared/ui/Modal/Modal";
import { Button, ButtonTheme } from "shared/ui/Button/Button";

import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Navbar.module.scss";

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const { t } = useTranslation();

    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    return (
        <div className={classNames(styles.navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={styles.links}
                onClick={onToggleModal}
            >
                {t("Login", { ns: "translation" })}
            </Button>
            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                {t("text lorem ipsum lorem ipsum", { ns: "translation" })}
            </Modal>
        </div>
    );
};

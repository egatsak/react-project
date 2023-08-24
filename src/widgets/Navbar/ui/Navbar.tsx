import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getUserAuthData } from "@/entities/User";
import { LoginModal } from "@/features/AuthByUsername";
import { AvatarDropdown } from "@/features/AvatarDropdown";
import { NotificationButton } from "@/features/NotificationButton";
import { getRouteArticleCreate } from "@/shared/const/router";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "@/shared/ui/deprecated/AppLink/AppLink";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button/Button";
import { HStack } from "@/shared/ui/deprecated/Stack";
import { Text, TextTheme } from "@/shared/ui/deprecated/Text/Text";

import styles from "./Navbar.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const { t } = useTranslation("translation");

    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    if (authData) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <header
                        className={classNames(styles.navbarRedesigned, {}, [
                            className,
                        ])}
                    >
                        <HStack gap="16" className={styles.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
                off={
                    <header
                        className={classNames(styles.navbar, {}, [className])}
                    >
                        <Text
                            className={styles.appName}
                            title={t("App", { ns: "translation" })}
                            theme={TextTheme.INVERTED}
                        />
                        <AppLink
                            to={getRouteArticleCreate()}
                            theme={AppLinkTheme.SECONDARY}
                        >
                            {t("Create new article", { ns: "translation" })}
                        </AppLink>
                        <HStack gap="16" className={styles.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
            />
        );
    }

    return (
        <header className={classNames(styles.navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={styles.links}
                onClick={onShowModal}
            >
                {t("Log-in", { ns: "translation" })}
            </Button>
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </header>
    );
});

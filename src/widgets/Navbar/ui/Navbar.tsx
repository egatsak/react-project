import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getUserAuthData } from "@/entities/User";
import { LoginModal } from "@/features/AuthByUsername";
import { AvatarDropdown } from "@/features/AvatarDropdown";
import { NotificationButton } from "@/features/NotificationButton";
import { getRouteArticleCreate } from "@/shared/const/router";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    AppLink as AppLinkDeprecated,
    AppLinkTheme,
} from "@/shared/ui/deprecated/AppLink/AppLink";
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { Text, TextTheme } from "@/shared/ui/deprecated/Text/Text";

import styles from "./Navbar.module.scss";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { Button } from "@/shared/ui/redesigned/Button/Button";

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

    const mainClass = toggleFeatures({
        name: "isAppRedesigned",
        on: () => styles.navbarRedesigned,
        off: () => styles.navbar,
    });

    if (authData) {
        return (
            <header className={classNames(mainClass, {}, [className])}>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <HStack gap="16" className={styles.actions}>
                            <NotificationButton />
                            <AvatarDropdown />
                        </HStack>
                    }
                    off={
                        <>
                            <Text
                                className={styles.appName}
                                title={t("App", { ns: "translation" })}
                                theme={TextTheme.INVERTED}
                            />
                            <AppLinkDeprecated
                                to={getRouteArticleCreate()}
                                theme={AppLinkTheme.SECONDARY}
                            >
                                {t("Create new article", { ns: "translation" })}
                            </AppLinkDeprecated>
                            <HStack gap="16" className={styles.actions}>
                                <NotificationButton />
                                <AvatarDropdown />
                            </HStack>
                        </>
                    }
                />
            </header>
        );
    }

    return (
        <header className={classNames(mainClass, {}, [className])}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Button
                        variant="clear"
                        className={styles.links}
                        onClick={onShowModal}
                    >
                        {t("Log-in", { ns: "translation" })}
                    </Button>
                }
                off={
                    <ButtonDeprecated
                        theme={ButtonTheme.CLEAR_INVERTED}
                        className={styles.links}
                        onClick={onShowModal}
                    >
                        {t("Log-in", { ns: "translation" })}
                    </ButtonDeprecated>
                }
            />

            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </header>
    );
});

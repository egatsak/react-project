import { memo, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import { NotificationList } from "@/entities/Notification";
import NotificationIconDeprecated from "@/shared/assets/icons/icon-notification.svg";
import NotificationIcon from "@/shared/assets/icons/icon-notification-redesigned.svg";

import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { Drawer } from "@/shared/ui/deprecated/Drawer/Drawer";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon/Icon";
import { Popover as PopoverDeprecated } from "@/shared/ui/deprecated/Popups";
import { classNames } from "@/shared/lib/classNames/classNames";

import styles from "./NotificationButton.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import { Popover } from "@/shared/ui/redesigned/Popups";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />
            }
            off={
                <ButtonDeprecated
                    onClick={onOpenDrawer}
                    theme={ButtonTheme.CLEAR}
                >
                    <IconDeprecated Svg={NotificationIconDeprecated} inverted />
                </ButtonDeprecated>
            }
        />
    );

    return (
        <div>
            <BrowserView>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Popover
                            className={classNames(
                                styles.notificationButton,
                                {},
                                [className],
                            )}
                            direction="bottom-left"
                            trigger={trigger}
                        >
                            <NotificationList
                                className={styles.notifications}
                            />
                        </Popover>
                    }
                    off={
                        <PopoverDeprecated
                            className={classNames(
                                styles.notificationButton,
                                {},
                                [className],
                            )}
                            direction="bottom-left"
                            trigger={trigger}
                        >
                            <NotificationList
                                className={styles.notifications}
                            />
                        </PopoverDeprecated>
                    }
                />
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </div>
    );
});

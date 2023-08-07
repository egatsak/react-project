import { memo, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Popover } from "@/shared/ui/Popups";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { Icon } from "@/shared/ui/Icon/Icon";
import { NotificationList } from "@/entities/Notification";
import NotificationIcon from "@/shared/assets/icons/icon-notification.svg";
import { Drawer } from "@/shared/ui/Drawer/Drawer";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AnimationProvider } from "@/shared/lib/components/AnimationProvider";
import styles from "./NotificationButton.module.scss";

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
        <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
            <Icon Svg={NotificationIcon} inverted />
        </Button>
    );

    return (
        <div>
            <BrowserView>
                <Popover
                    className={classNames(styles.notificationButton, {}, [
                        className,
                    ])}
                    direction="bottom-left"
                    trigger={trigger}
                >
                    <NotificationList className={styles.notifications} />
                </Popover>
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

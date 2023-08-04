import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Popover } from "shared/ui/Popups";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";
import { NotificationList } from "entities/Notification";
import NotificationIcon from "shared/assets/icons/icon-notification.svg";
import styles from "./NotificationButton.module.scss";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;

    return (
        <Popover
            className={classNames(styles.notificationButton, {}, [className])}
            direction="bottom-left"
            trigger={
                <Button theme={ButtonTheme.CLEAR}>
                    <Icon Svg={NotificationIcon} inverted />
                </Button>
            }
        >
            <NotificationList className={styles.notifications} />
        </Popover>
    );
});

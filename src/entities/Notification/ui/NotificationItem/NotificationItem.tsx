import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    Card as CardDeprecated,
    CardTheme,
} from "@/shared/ui/deprecated/Card/Card";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text/Text";
import { Notification } from "../../model/types/notification";
import { ToggleFeatures } from "@/shared/lib/features";
import styles from "./NotificationItem.module.scss";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { Text } from "@/shared/ui/redesigned/Text/Text";

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;
    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    border="normalBorder"
                    className={classNames(
                        styles.notificationItemRedesigned,
                        {},
                        [className],
                    )}
                >
                    <Text title={item.title} text={item.description} />
                </Card>
            }
            off={
                <CardDeprecated
                    theme={CardTheme.OUTLINED}
                    className={classNames(styles.notificationItem, {}, [
                        className,
                    ])}
                >
                    <TextDeprecated
                        title={item.title}
                        text={item.description}
                    />
                </CardDeprecated>
            }
        />
    );

    if (item.href) {
        return (
            <a
                className={styles.link}
                target="_blank"
                rel="noreferrer"
                href={item.href}
            >
                {content}
            </a>
        );
    }

    return content;
});

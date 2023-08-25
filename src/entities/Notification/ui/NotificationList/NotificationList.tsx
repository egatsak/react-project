import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton/Skeleton";
import { useNotifications } from "../../api/notificationApi";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import styles from "./NotificationList.module.scss";

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 5000,
    });

    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames(styles.notificationList, {}, [className])}
            >
                <Skeleton width="100%" border="8px" height="90px" />
                <Skeleton width="100%" border="8px" height="90px" />
                <Skeleton width="100%" border="8px" height="90px" />
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames(styles.notificationList, {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    );
});

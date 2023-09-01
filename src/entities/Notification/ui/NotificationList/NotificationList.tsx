import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton/Skeleton";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { useNotifications } from "../../api/notificationApi";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import styles from "./NotificationList.module.scss";
import { toggleFeatures } from "@/shared/lib/features";

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 5000,
    });
    const Skeleton = toggleFeatures({
        name: "isAppRedesigned",
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                className={classNames(styles.notificationList, {}, [className])}
            >
                <Skeleton width="100%" border="12px" height="72px" />
                <Skeleton width="100%" border="12px" height="72px" />
                <Skeleton width="100%" border="12px" height="72px" />
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

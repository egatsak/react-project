import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Text } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { VStack } from "shared/ui/Stack";
import { Comment } from "../../model/types/comment";

import styles from "./CommentCard.module.scss";

interface CommentCardProps {
    comment?: Comment;
    className?: string;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <div
                className={classNames(styles.commentCard, {}, [
                    className,
                    styles.loading,
                ])}
            >
                <div className={styles.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton
                        width={100}
                        height={16}
                        className={styles.username}
                    />
                </div>
                <Skeleton width="100%" height={50} className={styles.text} />
            </div>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <VStack
            max
            gap="8"
            className={classNames(styles.commentCard, {}, [className])}
        >
            <AppLink
                to={`${RoutePath.profile}${comment.user.id}`}
                className={styles.header}
            >
                {comment.user.avatar && (
                    <Avatar size={30} src={comment.user.avatar} />
                )}
                <Text
                    title={comment.user.username}
                    className={styles.username}
                />
            </AppLink>
            <Text text={comment.text} />
        </VStack>
    );
});

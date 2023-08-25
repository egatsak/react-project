import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Avatar } from "@/shared/ui/deprecated/Avatar/Avatar";
import { Text } from "@/shared/ui/deprecated/Text/Text";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton/Skeleton";
import { AppLink } from "@/shared/ui/deprecated/AppLink/AppLink";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Comment } from "../../model/types/comment";

import styles from "./CommentCard.module.scss";
import { getRouteProfile } from "@/shared/const/router";

interface CommentCardProps {
    comment?: Comment;
    className?: string;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <VStack
                data-testid="CommentCard.Loading"
                gap="8"
                max
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
            </VStack>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <VStack
            data-testid="CommentCard.Content"
            max
            gap="8"
            className={classNames(styles.commentCard, {}, [className])}
        >
            <AppLink
                to={getRouteProfile(comment.user.id)}
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

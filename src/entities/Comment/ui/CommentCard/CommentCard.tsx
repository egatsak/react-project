import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Text } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Comment } from "../../model/types/comment";

import styles from "./CommentCard.module.scss";

interface CommentCardProps {
    comment: Comment;
    className?: string;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <div className={classNames(styles.commentCard, {}, [className])}>
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
    return (
        <div className={classNames(styles.commentCard, {}, [className])}>
            <div className={styles.header}>
                {comment.user.avatar && (
                    <Avatar size={30} src={comment.user.avatar} />
                )}
                <Text
                    title={comment.user.username}
                    className={styles.username}
                />
            </div>
            <Text text={comment.text} className={styles.text} />
        </div>
    );
});

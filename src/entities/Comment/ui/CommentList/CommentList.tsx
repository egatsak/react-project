import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { classNames } from "shared/lib/classNames/classNames";
import { Comment } from "../../model/types/comment";
import { CommentCard } from "../CommentCard/CommentCard";

import styles from "./CommentList.module.scss";

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, comments, isLoading } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(styles.commentList, {}, [className])}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        comment={comment}
                        className={styles.comment}
                        isLoading={isLoading}
                    />
                ))
            ) : (
                <Text
                    text={t("There are no comments", { ns: "translation" })}
                />
            )}
        </div>
    );
});

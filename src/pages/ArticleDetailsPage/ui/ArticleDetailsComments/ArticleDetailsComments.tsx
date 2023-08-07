import { Suspense, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";

import { AddCommentForm } from "@/features/AddCommentForm";
import { CommentList } from "@/entities/Comment";
import { Text, TextSize } from "@/shared/ui/Text/Text";
import { classNames } from "@/shared/lib/classNames/classNames";

import { VStack } from "@/shared/ui/Stack";
import { Loader } from "@/shared/ui/Loader/Loader";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { getArticleComments } from "../../model/slice/articleDetailsCommentsSlice";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";

interface ArticleDetailsCommentsProps {
    className?: string;
    id?: string;
}

export const ArticleDetailsComments = memo(
    (props: ArticleDetailsCommentsProps) => {
        const { className, id } = props;
        const { t } = useTranslation();
        const comments = useSelector(getArticleComments.selectAll);
        const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

        const dispatch = useAppDispatch();

        useInitialEffect(() => {
            dispatch(fetchCommentsByArticleId(id));
        });

        const onSendComment = useCallback(
            (text: string) => {
                dispatch(addCommentForArticle(text));
            },
            [dispatch]
        );
        return (
            <VStack gap="16" max className={classNames("", {}, [className])}>
                <Text
                    size={TextSize.L}
                    title={t("Comments", { ns: "article" })}
                />
                {/*       <Suspense fallback={<Loader />}> */}
                <AddCommentForm onSendComment={onSendComment} />
                {/*         </Suspense> */}
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </VStack>
        );
    }
);

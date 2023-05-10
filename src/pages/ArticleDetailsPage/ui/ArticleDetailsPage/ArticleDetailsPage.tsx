import { FC, memo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ArticleDetails, ArticleList, ArticleView } from "entities/Article";

import { AddCommentForm } from "features/AddCommentForm";
import { Text, TextSize } from "shared/ui/Text/Text";
import { CommentList } from "entities/Comment";
import {
    DynamicModuleLoader,
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Page } from "widgets/Page/Page";
import { articleDetailsPageReducer } from "../../model/slice";
import { fetchArticleRecommendations } from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import { getArticleRecommendationsIsLoading } from "../../model/selectors/recommendations";
import { getArticleRecommendations } from "../../model/slice/articleDetailsPageRecommendationsSlice";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { getArticleComments } from "../../model/slice/articleDetailsCommentsSlice";

import styles from "./ArticleDetailsPage.module.scss";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation("article");
    const { id } = useParams<{ id: string }>();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(
        getArticleRecommendationsIsLoading
    );

    const dispatch = useAppDispatch();

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch]
    );

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    });

    if (!id) {
        return (
            <Page
                className={classNames(styles.articleDetailsPage, {}, [
                    className,
                ])}
            >
                {t("Article not found", { ns: "article" })}
            </Page>
        );
    }
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(styles.articleDetailsPage, {}, [
                    className,
                ])}
            >
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <Text
                    size={TextSize.L}
                    title={t("Recommendations", { ns: "article" })}
                    className={styles.commentTitle}
                />
                <ArticleList
                    target="_blank"
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    className={styles.recommendations}
                    view={ArticleView.GRID}
                />
                <Text
                    size={TextSize.L}
                    title={t("Comments", { ns: "article" })}
                    className={styles.commentTitle}
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);

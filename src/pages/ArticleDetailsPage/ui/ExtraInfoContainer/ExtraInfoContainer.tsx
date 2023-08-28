import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { ArticleExtraInfo } from "@/widgets/ArticleExtraInfo";
import { getArticleDetailsData } from "@/entities/Article";
import styles from "./ExtraInfoContainer.module.scss";
import { getRouteArticleEdit } from "@/shared/const/router";

export const ExtraInfoContainer = memo(() => {
    const navigate = useNavigate();
    const article = useSelector(getArticleDetailsData);

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [article, navigate]);

    if (!article) {
        return null;
    }

    return (
        <Card padding="24" border="round" className={styles.card}>
            <ArticleExtraInfo
                author={article.user}
                createdAt={article.createdAt}
                views={article.views}
                onEdit={onEditArticle}
            />
        </Card>
    );
});

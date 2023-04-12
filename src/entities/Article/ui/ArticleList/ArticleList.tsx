import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const { className, articles, isLoading, view = ArticleView.GRID } = props;
    const { t } = useTranslation();

    const renderArticle = (article: Article) => (
        <ArticleListItem article={article} view={view} />
    );

    return (
        <div className={classNames(styles.articleList, {}, [className])}>
            {articles.length > 0 ? articles.map(renderArticle) : null}
        </div>
    );
});

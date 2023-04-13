import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import styles from "./ArticleList.module.scss";

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
}

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.GRID ? 9 : 3).fill(0).map((item, index) => (
        <ArticleListItemSkeleton
            // eslint-disable-next-line react/no-array-index-key
            key={String(index)}
            className={styles.card}
            view={view}
        />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
    const { className, articles, isLoading, view = ArticleView.LIST } = props;

    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            view={view}
            className={styles.card}
            key={article.id}
        />
    );

    if (isLoading) {
        return (
            <div
                className={classNames(styles.articleList, {}, [
                    className,
                    styles[view],
                ])}
            >
                {getSkeletons(view)}
            </div>
        );
    }

    return (
        <div
            className={classNames(styles.articleList, {}, [
                className,
                styles[view],
            ])}
        >
            {articles.length > 0 ? articles.map(renderArticle) : null}
        </div>
    );
});

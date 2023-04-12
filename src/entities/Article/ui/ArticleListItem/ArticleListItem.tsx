import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Text } from "shared/ui/Text/Text";
import { Icon } from "shared/ui/Icon/Icon";
import EyeIcon from "shared/assets/icons/icon-article-eye.svg";
import { Card } from "shared/ui/Card/Card";
import { useHover } from "shared/lib/hooks/useHover/useHover";
import { Article, ArticleView } from "../../model/types/article";
import styles from "./ArticleListItem.module.scss";

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { className, article, view } = props;
    const [isHover, bindHover] = useHover();
    const { t } = useTranslation();

    if (view === ArticleView.LIST) {
        return (
            <div
                className={classNames(styles.articleListItem, {}, [
                    className,
                    styles[view],
                ])}
            >
                {article.title}
            </div>
        );
    }

    return (
        <div
            className={classNames(styles.articleListItem, {}, [
                className,
                styles[view],
            ])}
            {...bindHover}
        >
            <Card className={styles.card}>
                <div className={styles.imageWrapper}>
                    <img
                        src={article.img}
                        className={styles.img}
                        alt={article.title}
                    />
                    <Text text={article.createdAt} className={styles.date} />
                </div>
                <div className={styles.infoWrapper}>
                    <Text
                        text={article.type.join(", ")}
                        className={styles.types}
                    />
                    <Text
                        text={String(article.views)}
                        className={styles.views}
                    />
                    <Icon Svg={EyeIcon} />
                </div>
                <Text text={article.title} className={styles.title} />
            </Card>
        </div>
    );
});

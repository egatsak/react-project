import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Text } from "shared/ui/Text/Text";
import { Icon } from "shared/ui/Icon/Icon";
import EyeIcon from "shared/assets/icons/icon-article-eye.svg";
import { Card } from "shared/ui/Card/Card";
import { useHover } from "shared/lib/hooks/useHover/useHover";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Button } from "shared/ui/Button/Button";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { classNames } from "shared/lib/classNames/classNames";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import {
    Article,
    ArticleBlockType,
    ArticleTextBlock,
    ArticleView,
} from "../../model/types/article";

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

    const navigate = useNavigate();

    const onOpenArticle = useCallback(() => {
        navigate(RoutePath.article_details + article.id);
    }, [article.id, navigate]);

    const types = (
        <Text text={article.type.join(", ")} className={styles.types} />
    );

    const views = (
        <>
            <Text text={String(article.views)} className={styles.views} />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock;

        return (
            <div
                className={classNames(styles.articleListItem, {}, [
                    className,
                    styles[view],
                ])}
            >
                <Card className={styles.card}>
                    <div className={styles.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text
                            text={article.user.username}
                            className={styles.username}
                        />
                        <Text
                            text={article.createdAt}
                            className={styles.date}
                        />
                    </div>
                    <Text title={article.title} className={styles.title} />
                    {types}
                    <img
                        src={article.img}
                        className={styles.img}
                        alt={article.title}
                    />
                    {textBlock && (
                        <ArticleTextBlockComponent
                            block={textBlock}
                            className={styles.textBlock}
                        />
                    )}
                    <div className={styles.footer}>
                        <Button onClick={onOpenArticle}>
                            {t("Read more", { ns: "article" })}
                        </Button>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div
            {...bindHover}
            className={classNames(styles.articleListItem, {}, [
                className,
                styles[view],
            ])}
        >
            <Card className={styles.card} onClick={onOpenArticle}>
                <div className={styles.imageWrapper}>
                    <img
                        src={article.img}
                        className={styles.img}
                        alt={article.title}
                    />
                    <Text text={article.createdAt} className={styles.date} />
                </div>
                <div className={styles.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={styles.title} />
            </Card>
        </div>
    );
});

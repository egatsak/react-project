import { memo } from "react";
import { useTranslation } from "react-i18next";

import { Text } from "@/shared/ui/deprecated/Text/Text";
import { Icon } from "@/shared/ui/deprecated/Icon/Icon";
import EyeIcon from "@/shared/assets/icons/icon-article-eye.svg";
import { Card } from "@/shared/ui/deprecated/Card/Card";
import { useHover } from "@/shared/lib/hooks/useHover/useHover";
import { Avatar } from "@/shared/ui/deprecated/Avatar/Avatar";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button/Button";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink } from "@/shared/ui/deprecated/AppLink/AppLink";
import { ArticleTextBlockComponent } from "../../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { ArticleTextBlock } from "../../../model/types/article";
import {
    ArticleBlockType,
    ArticleView,
} from "../../../model/consts/articleConsts";

import styles from "./ArticleListItemDeprecated.module.scss";
import { getRouteArticleDetails } from "@/shared/const/router";
import { AppImage } from "@/shared/ui/redesigned/AppImage/AppImage";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton/Skeleton";
import { ArticleListItemProps } from "../ArticleListItem";

export const ArticleListItemDeprecated = memo((props: ArticleListItemProps) => {
    const { className, article, view, target } = props;
    const [_, bindHover] = useHover();
    const { t } = useTranslation();

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
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <div
                data-testid="ArticleListItem"
                className={classNames("", {}, [className, styles[view]])}
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
                    <AppImage
                        fallback={<Skeleton width="100%" height={250} />}
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
                        <AppLink
                            target={target}
                            to={getRouteArticleDetails(article.id)}
                        >
                            <Button theme={ButtonTheme.OUTLINE}>
                                {t("Read more", { ns: "article" })}
                            </Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(styles.articleListItem, {}, [
                className,
                styles[view],
            ])}
            {...bindHover}
        >
            <Card className={styles.card}>
                <div className={styles.imageWrapper}>
                    <AppImage
                        src={article.img}
                        className={styles.img}
                        alt={article.title}
                        fallback={<Skeleton width={200} height={200} />}
                    />
                    <Text text={article.createdAt} className={styles.date} />
                </div>
                <div className={styles.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={styles.title} />
            </Card>
        </AppLink>
    );
});

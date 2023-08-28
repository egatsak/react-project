import { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ArticleListItemProps } from "../ArticleListItem";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { useHover } from "@/shared/lib/hooks/useHover/useHover";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { AppImage } from "@/shared/ui/redesigned/AppImage/AppImage";
import { AppLink } from "@/shared/ui/redesigned/AppLink/AppLink";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { getRouteArticleDetails } from "@/shared/const/router";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";
import {
    ArticleBlockType,
    ArticleView,
} from "../../../model/consts/articleConsts";
import EyeIcon from "@/shared/assets/icons/icon-eye-redesigned.svg";
import { ArticleTextBlock } from "../../../model/types/article";
import styles from "./ArticleListItemRedesigned.module.scss";

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
    const { className, article, view, target } = props;
    const [_, bindHover] = useHover();
    const { t } = useTranslation();

    const userInfo = (
        <>
            <Avatar
                className={styles.avatar}
                size={32}
                src={article.user.avatar}
            />
            <Text bold text={article.user.username} />
        </>
    );

    const views = (
        <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={String(article.views)} className={styles.views} />
        </HStack>
    );

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <Card
                padding="24"
                max
                data-testid="ArticleListItem"
                className={classNames(styles.articleListItemRedesigned, {}, [
                    className,
                    styles[view],
                ])}
            >
                <VStack max gap="16">
                    <HStack gap="8" className={styles.header}>
                        {userInfo}
                        <Text text={article.createdAt} />
                    </HStack>

                    <Text bold title={article.title} />
                    <Text size="s" title={article.subtitle} />

                    <AppImage
                        fallback={<Skeleton width="100%" height={250} />}
                        src={article.img}
                        className={styles.img}
                        alt={article.title}
                    />

                    {textBlock?.paragraphs && (
                        <Text
                            text={textBlock.paragraphs.slice(0, 2).join("\n")}
                            className={styles.textBlock}
                        />
                    )}
                    <HStack max gap="8">
                        <AppLink
                            target={target}
                            to={getRouteArticleDetails(article.id)}
                        >
                            <Button variant="outline">
                                {t("Read more", { ns: "article" })}
                            </Button>
                        </AppLink>
                        {views}
                    </HStack>
                </VStack>
            </Card>
        );
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(styles.ArticleListItem, {}, [
                className,
                styles[view],
            ])}
        >
            <Card className={styles.card} border="round" padding="0">
                <AppImage
                    fallback={<Skeleton width="100%" height={200} />}
                    alt={article.title}
                    src={article.img}
                    className={styles.img}
                />
                <VStack className={styles.info} gap="4">
                    <Text title={article.title} className={styles.title} />
                    <VStack gap="4" className={styles.footer} max>
                        <HStack justify="between" max>
                            <Text
                                text={article.createdAt}
                                className={styles.date}
                            />
                            {views}
                        </HStack>
                        <HStack gap="4">{userInfo}</HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});

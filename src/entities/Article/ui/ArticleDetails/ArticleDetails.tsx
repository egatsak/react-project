import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text, TextAlign, TextSize } from "@/shared/ui/Text/Text";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import EyeIcon from "@/shared/assets/icons/icon-article-eye.svg";
import CalendarIcon from "@/shared/assets/icons/icon-article-calendar.svg";

import { Icon } from "@/shared/ui/Icon/Icon";
import { HStack, VStack } from "@/shared/ui/Stack";
import { ArticleBlock } from "../../model/types/article";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";

import styles from "./ArticleDetails.module.scss";
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { ArticleBlockType } from "../../model/consts/articleConsts";

function renderBlock(block: ArticleBlock) {
    switch (block.type) {
        case ArticleBlockType.CODE:
            return (
                <ArticleCodeBlockComponent
                    key={block.id}
                    className={styles.block}
                    block={block}
                />
            );
        case ArticleBlockType.IMAGE:
            return (
                <ArticleImageBlockComponent
                    key={block.id}
                    className={styles.block}
                    block={block}
                />
            );
        case ArticleBlockType.TEXT:
            return (
                <ArticleTextBlockComponent
                    key={block.id}
                    className={styles.block}
                    block={block}
                />
            );
        default:
            return null;
    }
}

interface ArticleDetailsProps {
    id?: string;
    className?: string;
}

const reducers: ReducersList = { articleDetails: articleDetailsReducer };

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation("article");
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        if (__PROJECT__ !== "storybook") {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton
                    className={styles.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <Skeleton className={styles.title} width={300} height={32} />
                <Skeleton
                    className={styles.skeleton}
                    width="100%"
                    height={24}
                />
                <Skeleton
                    className={styles.skeleton}
                    width="100%"
                    height={200}
                />
                <Skeleton
                    className={styles.skeleton}
                    width="100%"
                    height={200}
                />
            </>
        );
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                title={t("Article loading error", { ns: "article" })}
            />
        );
    } else {
        content = (
            <>
                <HStack justify="center" max className={styles.avatarWrapper}>
                    <Avatar
                        size={200}
                        src={article?.img}
                        className={styles.avatar}
                    />
                </HStack>
                <VStack gap="4" max data-testid="ArticleDetails.Info">
                    <Text
                        title={article?.title}
                        text={article?.subtitle}
                        className={styles.title}
                        size={TextSize.L}
                    />
                    <HStack gap="8" className={styles.articleInfo}>
                        <Icon Svg={EyeIcon} className={styles.icon} />
                        <Text text={`${article?.views}`} />
                    </HStack>
                    <HStack gap="8" className={styles.articleInfo}>
                        <Icon Svg={CalendarIcon} className={styles.icon} />
                        <Text text={article?.createdAt} />
                    </HStack>
                </VStack>

                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                gap="16"
                max
                className={classNames(styles.articleDetails, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});

import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    Text as TextDeprecated,
    TextAlign,
    TextSize,
} from "@/shared/ui/deprecated/Text/Text";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton/Skeleton";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar/Avatar";
import EyeIcon from "@/shared/assets/icons/icon-article-eye.svg";
import CalendarIcon from "@/shared/assets/icons/icon-article-calendar.svg";

import { Icon } from "@/shared/ui/deprecated/Icon/Icon";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";

import styles from "./ArticleDetails.module.scss";
import { renderArticleBlock } from "./renderArticleBlock";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { AppImage } from "@/shared/ui/redesigned/AppImage/AppImage";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton/Skeleton";

interface ArticleDetailsProps {
    id?: string;
    className?: string;
}

const reducers: ReducersList = { articleDetails: articleDetailsReducer };

const Deprecated = () => {
    const article = useSelector(getArticleDetailsData);

    return (
        <>
            <HStack justify="center" max className={styles.avatarWrapper}>
                <AvatarDeprecated
                    size={200}
                    src={article?.img}
                    className={styles.avatar}
                />
            </HStack>
            <VStack gap="4" max data-testid="ArticleDetails.Info">
                <TextDeprecated
                    title={article?.title}
                    text={article?.subtitle}
                    className={styles.title}
                    size={TextSize.L}
                />
                <HStack gap="8" className={styles.articleInfo}>
                    <Icon Svg={EyeIcon} className={styles.icon} />
                    <TextDeprecated text={`${article?.views}`} />
                </HStack>
                <HStack gap="8" className={styles.articleInfo}>
                    <Icon Svg={CalendarIcon} className={styles.icon} />
                    <TextDeprecated text={article?.createdAt} />
                </HStack>
            </VStack>

            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

const Redesigned = () => {
    const article = useSelector(getArticleDetailsData);

    return (
        <>
            <Text title={article?.title} size="l" bold />
            <Text title={article?.subtitle} size="m" />
            <AppImage
                className={styles.img}
                fallback={<Skeleton width="100%" height={420} border="16px" />}
                src={article?.img}
            />

            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation("article");
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
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
                <SkeletonDeprecated
                    className={styles.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <SkeletonDeprecated
                    className={styles.title}
                    width={300}
                    height={32}
                />
                <SkeletonDeprecated
                    className={styles.skeleton}
                    width="100%"
                    height={24}
                />
                <SkeletonDeprecated
                    className={styles.skeleton}
                    width="100%"
                    height={200}
                />
                <SkeletonDeprecated
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
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Redesigned />}
                off={<Deprecated />}
            />
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

import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ArticleDetails } from "@/entities/Article";

import { ArticleRating } from "@/features/ArticleRating";
import { Page } from "@/widgets/Page";
import { ArticleRecommendationsList } from "@/features/ArticleRecommendationsList";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ToggleFeatures } from "@/shared/lib/features";
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Card } from "@/shared/ui/deprecated/Card/Card";
import { VStack } from "@/shared/ui/deprecated/Stack";

import { articleDetailsPageReducer } from "../../model/slice";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";

import styles from "./ArticleDetailsPage.module.scss";

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
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ToggleFeatures
                        feature="isArticleRatingEnabled"
                        on={<ArticleRating articleId={id} />}
                        off={
                            <Card>
                                {t("Article ratings will be introduced soon!", {
                                    ns: "article",
                                })}
                            </Card>
                        }
                    />
                    <ArticleRecommendationsList
                        className={styles.recommendations}
                    />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);

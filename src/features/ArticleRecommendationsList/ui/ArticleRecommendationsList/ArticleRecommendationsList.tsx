import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleList, ArticleView } from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Text, TextSize } from "@/shared/ui/deprecated/Text/Text";
import { useArticleRecommendationsList } from "../../api/articleRecommendationsApi";

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className } = props;
        const { t } = useTranslation();
        const {
            isLoading,
            data: articles,
            error,
        } = useArticleRecommendationsList(3);

        if (isLoading || error || !articles) {
            return null;
        }

        return (
            <VStack
                data-testid="ArticleRecommendationsList"
                gap="16"
                className={classNames("", {}, [className])}
            >
                <Text
                    size={TextSize.L}
                    title={t("Recommendations", { ns: "article" })}
                />
                <ArticleList
                    target="_blank"
                    articles={articles}
                    view={ArticleView.GRID}
                />
            </VStack>
        );
    },
);

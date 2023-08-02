import { rtkApi } from "shared/api/rtkApi";
import { Article } from "entities/Article";

const queryCallback = (limit: number) => {
    const params = {
        _limit: limit,
        ...(__PROJECT__ !== "storybook" ? { _expand: "user" } : {}),
    };
    return {
        url: "/articles",
        params,
    };
};

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], number>({
            query: queryCallback,
        }),
    }),
});

export const useArticleRecommendationsList =
    recommendationsApi.useGetArticleRecommendationsListQuery;

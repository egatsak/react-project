import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article, ArticleType } from "entities/Article";
import { addQueryParams } from "shared/lib/url/addQueryParams/addQueryParams";
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from "../../selectors/articlesPageSelectors";

interface FetchArticleListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticleListProps,
    ThunkConfig<string>
>("articlesPage/fetchArticlesList", async (_, thunkApi) => {
    const { rejectWithValue, extra, getState } = thunkApi;

    const page = getArticlesPageNum(getState());
    const limit = getArticlesPageLimit(getState());
    const sort = getArticlesPageSort(getState());
    const search = getArticlesPageSearch(getState());
    const order = getArticlesPageOrder(getState());
    const type = getArticlesPageType(getState());

    try {
        addQueryParams({ sort, order, search, type });
        const response = await extra.api.get<Article[]>(`/articles`, {
            params: {
                _expand: "user",
                _page: page,
                _limit: limit,
                _sort: sort,
                _order: order,
                q: search,
                type_like: type === ArticleType.ALL ? undefined : type,
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue("Error fetching articles!");
    }
});

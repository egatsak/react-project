import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNum,
} from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slice/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>("articlesPage/fetchNextArticlesPage", async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const state = getState();
    const hasMore = getArticlesPageHasMore(state);
    const page = getArticlesPageNum(state);
    const isLoading = getArticlesPageIsLoading(state);

    if (hasMore && !isLoading) {
        dispatch(articlesPageActions.setPage(page + 1));
        dispatch(fetchArticlesList({ page: page + 1 }));
    }
});

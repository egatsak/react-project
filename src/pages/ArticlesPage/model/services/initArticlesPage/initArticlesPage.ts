import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { SortOrder } from "@/shared/types/sort";
import { ArticleSortField, ArticleType } from "@/entities/Article";
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slice/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>("articlesPage/initArticlesPage", async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getArticlesPageInited(getState());

    if (!inited) {
        searchParams.forEach((value, key) => {
            switch (key) {
                case "order":
                    dispatch(articlesPageActions.setOrder(value as SortOrder));
                    break;
                case "sort":
                    dispatch(
                        articlesPageActions.setSort(value as ArticleSortField)
                    );
                    break;
                case "search":
                    dispatch(articlesPageActions.setSearch(value));
                    break;
                case "type":
                    dispatch(articlesPageActions.setType(value as ArticleType));
                    break;
                default:
                    break;
            }
        });
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({}));
    }
});

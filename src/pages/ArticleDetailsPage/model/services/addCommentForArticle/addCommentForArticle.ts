import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Comment } from "@/entities/Comment";
import { getArticleDetailsData } from "@/entities/Article/model/selectors/articleDetails";
import { fetchCommentsByArticleId } from "../fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>("articleDetails/addCommentForArticle", async (text, thunkApi) => {
    const { dispatch, rejectWithValue, extra, getState } = thunkApi;

    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
        return rejectWithValue("No data!");
    }

    try {
        const response = await extra.api.post<Comment>("/comments", {
            articleId: article.id,
            userId: userData.id,
            text,
        });

        if (!response.data) {
            throw new Error("Empty server response!");
        }

        dispatch(fetchCommentsByArticleId(article.id));

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue("Error fetching users!");
    }
});

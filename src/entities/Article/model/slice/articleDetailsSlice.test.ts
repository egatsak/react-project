import { ArticleBlockType, ArticleType } from "../consts/articleConsts";
import { fetchArticleById } from "../services/fetchArticleById/fetchArticleById";
import { Article } from "../types/article";
import { ArticleDetailsSchema } from "../types/articleDetailsSchema";
import { articleDetailsReducer } from "./articleDetailsSlice";

const data: Article = {
    id: "1",
    title: "123",
    user: {
        id: "1",
        username: "admin",
        avatar: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1678878206~exp=1678878806~hmac=ff7478bd3b805663959f2187faa48a4fbc0051148c5ccdb48b1c9066f43d8253F",
    },
    subtitle: "1234",
    views: 123,
    img: "1235",
    createdAt: "11-11-2011",
    type: [ArticleType.IT],
    blocks: [
        {
            id: "2",
            type: ArticleBlockType.TEXT,
            paragraphs: ["123456", "12345677"],
        },
    ],
};

test("test update article details service pending", () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
        isLoading: false,
    };
    expect(
        articleDetailsReducer(
            state as ArticleDetailsSchema,
            fetchArticleById.pending
        )
    ).toEqual({
        isLoading: true,
    });
});

test("test update profile service fulfilled", () => {
    const state: DeepPartial<ArticleDetailsSchema> = {
        isLoading: true,
    };
    expect(
        articleDetailsReducer(
            state as ArticleDetailsSchema,
            fetchArticleById.fulfilled(data, "", "")
        )
    ).toEqual({
        isLoading: false,
        error: undefined,
        data,
    });
});

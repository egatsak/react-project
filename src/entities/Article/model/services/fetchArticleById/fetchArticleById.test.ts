import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchArticleById } from "./fetchArticleById";
import { Article, ArticleBlockType, ArticleType } from "../../types/article";

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

describe("THUNK fetchArticleById", () => {
    test("success fetch", async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk("/articles/1");

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("fulfilled");
        expect(result.payload).toEqual(data);
    });

    test("error fetch", async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk("/articles/1");

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("rejected");
        expect(result.payload).toBe("Error fetching articles!");
    });
});

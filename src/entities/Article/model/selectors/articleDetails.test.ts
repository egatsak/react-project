import { StateSchema } from "@/app/providers/StoreProvider";
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from "./articleDetails";

describe("articleDetailsSelectors.test", () => {
    test("should return article details with nonempty state", () => {
        const data = {
            id: "1",
            title: "subtitle",
        };

        const state: DeepPartial<StateSchema> = {
            articleDetails: { data },
        };

        expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
    });

    test("should return data undefined with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
    });

    test("should return isLoading with nonempty state", () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: { isLoading: true },
        };

        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
    });

    test("should return isLoading false with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
    });

    test("should return error with nonempty state", () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: { error: "error" },
        };

        expect(getArticleDetailsError(state as StateSchema)).toEqual("error");
    });

    test("should return error undefined with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
    });
});

import { StateSchema } from "@/app/providers/StoreProvider";
import { getProfileError } from "./getProfileError";

describe("getProfileError.test", () => {
    test("should return error with nonempty state", () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: "12345",
            },
        };
        expect(getProfileError(state as StateSchema)).toEqual("12345");
    });

    test("should work with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileError(state as StateSchema)).toEqual(undefined);
    });
});

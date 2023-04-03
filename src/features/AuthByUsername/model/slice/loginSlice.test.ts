import { LoginSchema } from "../types/LoginSchema";
import { loginActions, loginReducer } from "./loginSlice";

describe("loginSlice.test", () => {
    test("test set username", () => {
        const state: DeepPartial<LoginSchema> = { username: "123" };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setUsername("user2")
            )
        ).toEqual({ username: "user2" });
    });

    test("test set password", () => {
        const state: DeepPartial<LoginSchema> = { password: "321" };
        expect(
            loginReducer(state as LoginSchema, loginActions.setPassword("123"))
        ).toEqual({ password: "123" });
    });
});

import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { Profile, ProfileSchema, ValidateProfileError } from "../types/profile";
import { profileActions, profileReducer } from "./profileSlice";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";

const data: Profile = {
    username: "admin",
    age: 30,
    country: Country.BELARUS,
    lastname: "Petrov",
    first: "Ivan",
    city: "Zhlobin",
    currency: Currency.BYN,
    avatar: "testavatar",
};

describe("profileSlice.test", () => {
    test("test set readonly", () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.setReadonly(true)
            )
        ).toEqual({ readonly: true });
    });

    test("test cancel edit", () => {
        const state: DeepPartial<ProfileSchema> = {
            data,
            form: { username: "" },
        };
        expect(
            profileReducer(state as ProfileSchema, profileActions.cancelEdit())
        ).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data,
        });
    });

    test("test update profile", () => {
        const state: DeepPartial<ProfileSchema> = {
            form: { username: "123" },
        };
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.updateProfile({
                    username: "abcdef",
                })
            )
        ).toEqual({
            form: {
                username: "abcdef",
            },
        });
    });

    test("test update profile service pending", () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };
        expect(
            profileReducer(state as ProfileSchema, updateProfileData.pending)
        ).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test("test update profile service fulfilled", () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };
        expect(
            profileReducer(
                state as ProfileSchema,
                updateProfileData.fulfilled(data, "")
            )
        ).toEqual({
            isLoading: false,
            readonly: true,
            validateErrors: undefined,
            validateError: undefined,
            form: data,
            data,
        });
    });
});

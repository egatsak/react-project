import { StateSchema } from "app/providers/StoreProvider";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { getProfileForm } from "./getProfileForm";
import { Profile } from "../../types/profile";

describe("getProfileForm.test", () => {
    test("should return form data with nonempty state", () => {
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

        const state: DeepPartial<StateSchema> = {
            profile: {
                form: data,
            },
        };

        expect(getProfileForm(state as StateSchema)).toEqual(data);
    });

    test("should work with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});

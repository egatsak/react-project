import { StateSchema } from "@/app/providers/StoreProvider";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { Profile } from "@/entities/Profile";
import { getProfileData } from "./getProfileData";

describe("getProfileData.test", () => {
    test("should return profile data with nonempty state", () => {
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
                data,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });

    test("should work with empty state", () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});

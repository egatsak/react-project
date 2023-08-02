import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { Profile } from "entities/Profile";
import { validateProfileData } from "./validateProfileData";
import { ValidateProfileError } from "../../consts/consts";

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

describe("validateProfileData", () => {
    test("success validate", async () => {
        const result = validateProfileData(data);

        expect(result).toEqual([]);
    });

    test("error validate - invalid first and last name", async () => {
        const result = validateProfileData({
            ...data,
            first: "",
            lastname: "",
        });

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test("error validate - invalid age", async () => {
        const result = validateProfileData({
            ...data,
            age: undefined,
        });

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });

    test("error validate - invalid country", async () => {
        const result = validateProfileData({
            ...data,
            country: undefined,
        });

        expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
    });

    test("error validate - invalid all props", async () => {
        const result = validateProfileData({});

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });
});

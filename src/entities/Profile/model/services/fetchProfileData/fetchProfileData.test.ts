import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { fetchProfileData } from "./fetchProfileData";
import { Profile } from "../../types/profile";

const data: Profile = {
    username: "admin",
    age: 30,
    country: Country.BELARUS,
    lastname: "Petrov",
    first: "Ivan",
    city: "Zhlobin",
    currency: Currency.BYN,
    avatar: "testavatar",
    id: "1",
};

describe("THUNK fetchProfileData", () => {
    test("success fetch", async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk("1");

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("fulfilled");
        expect(result.payload).toEqual(data);
    });

    test("error fetch", async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk("1");

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe("rejected");
        expect(result.payload).toBe("Error fetching users!");
    });
});

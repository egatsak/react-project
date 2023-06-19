import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { Profile } from "entities/Profile";
import { componentRender } from "shared/lib/tests/componentRender/componentRender";
import { $api } from "shared/api/api";
import { profileReducer } from "../../model/slice/profileSlice";
import { EditableProfileCard } from "./EditableProfileCard";

const profile: Profile = {
    id: "1",
    first: "admin",
    lastname: "admin",
    age: 123,
    currency: Currency.USD,
    country: Country.BELARUS,
    city: "Minsk",
    username: "admin",
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: {
                id: "1",
                username: "admin",
            },
        },
    },
    asyncReducers: { profile: profileReducer },
};

describe("features/EditableProfileCard", () => {
    test("switch to edit mode", async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId("EditableProfileCardHeader.EditButton")
        );
        expect(
            screen.getByTestId("EditableProfileCardHeader.SaveButton")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("EditableProfileCardHeader.CancelButton")
        ).toBeInTheDocument();
    });

    test("switch back to readonly mode cancels changes", async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId("EditableProfileCardHeader.EditButton")
        );

        await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));
        await userEvent.clear(screen.getByTestId("ProfileCard.lastname"));

        await userEvent.type(
            screen.getByTestId("ProfileCard.firstname"),
            "test"
        );
        await userEvent.type(
            screen.getByTestId("ProfileCard.lastname"),
            "test1"
        );

        expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue("test");
        expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("test1");

        await userEvent.click(
            screen.getByTestId("EditableProfileCardHeader.CancelButton")
        );

        expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue(
            "admin"
        );
        expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("admin");
    });

    test("validation error", async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId("EditableProfileCardHeader.EditButton")
        );

        await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));
        expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue("");

        await userEvent.click(
            screen.getByTestId("EditableProfileCardHeader.SaveButton")
        );

        expect(
            screen.getByTestId("EditableProfileCard.error.Paragraph")
        ).toBeInTheDocument();
    });

    test("no validation errors => the app sends PUT query to the server", async () => {
        const mockPutRequest = jest.spyOn($api, "put");

        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId("EditableProfileCardHeader.EditButton")
        );

        await userEvent.type(
            screen.getByTestId("ProfileCard.firstname"),
            "test"
        );

        await userEvent.click(
            screen.getByTestId("EditableProfileCardHeader.SaveButton")
        );

        expect(mockPutRequest).toHaveBeenCalled();
    });
});

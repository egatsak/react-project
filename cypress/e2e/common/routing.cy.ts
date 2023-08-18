import { selectByTestId } from "cypress/helpers/selectByTestId";

describe("Routing", () => {
    describe("Unauthorized user", () => {
        it("Main page", () => {
            cy.visit("/");
            cy.get(selectByTestId("MainPage")).should("exist");
        });

        it("Profile page should redirect to main page", () => {
            cy.visit("/profile/1");
            cy.get(selectByTestId("MainPage")).should("exist");
        });

        it("Unknown route redirects to not found page", () => {
            cy.visit("/dfsdgsdfsfgsdgsdg");
            cy.get(selectByTestId("NotFoundPage")).should("exist");
        });
    });

    describe("Authorized user", () => {
        beforeEach(() => {
            cy.login();
        });

        it("Profile page", () => {
            cy.visit("/profile/1");
            cy.get(selectByTestId("ProfilePage")).should("exist");
        });

        it("Articles page", () => {
            cy.visit("/articles");
            cy.get(selectByTestId("ArticlesPage")).should("exist");
        });
    });
});

let profileId: string;

describe("User visits profile page", () => {
    beforeEach(() => {
        cy.visit("/profile");
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`/profile/${data.id}`);
        });
    });

    afterEach(() => {
        cy.resetProfile(profileId);
    });

    it("and their profile loads successfully", () => {
        cy.getByTestId("ProfileCard.firstname").should("have.value", "Ivan");
    });

    it("and they can edit their profile", () => {
        const newName = "new";
        const newLastname = "lastname";
        cy.updateProfile(newName, newLastname);
        cy.getByTestId("ProfileCard.firstname").should("have.value", newName);
        cy.getByTestId("ProfileCard.lastname").should(
            "have.value",
            newLastname
        );
    });
});

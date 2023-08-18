export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId("EditableProfileCardHeader.EditButton").click();
    cy.getByTestId("ProfileCard.firstname").clear().type(firstname);
    cy.getByTestId("ProfileCard.lastname").clear().type(lastname);
    cy.getByTestId("EditableProfileCardHeader.SaveButton").click();
};

export const resetProfile = (profileId: string) => {
    return cy.request({
        method: "PUT",
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { Authorization: `dfojwf` },
        body: {
            id: "4",
            first: "Ivan",
            lastname: "Dorn",
            age: 35,
            currency: "RUB",
            country: "Russia",
            city: "Moscow",
            username: "testuser",
            avatar:
                `https://img.freepik.com/free-vector/` +
                "businessman-character-avatar-isolated_24877-60111.jpg" +
                "?w=740&t=st=1678878206~exp=1678878806" +
                "~hmac=ff7478bd3b805663959f2187faa48a4fbc0051148c5ccdb48b1c9066f43d8253F",
        },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}

describe("User visits page containing article list", () => {
    beforeEach(() => {
        cy.login().then(() => {
            cy.visit(`/articles`);
        });
    });

    it("and articles load successfullys", () => {
        cy.getByTestId("ArticleList").should("exist");
        cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
    });
});

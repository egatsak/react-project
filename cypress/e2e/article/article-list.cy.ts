describe("User visits page containing article list", () => {
    beforeEach(() => {
        cy.login().then(() => {
            cy.visit(`/articles`);
        });
    });

    it("and articles load successfully", () => {
        cy.getByTestId("ArticleList").should("exist");
        cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
    });

    it("and articles load successfully (on stubs (fixtures))", () => {
        cy.intercept("GET", "**/articles?*", {
            fixture: "articles.json",
        });
        cy.getByTestId("ArticleList").should("exist");
        cy.getByTestId("ArticleListItem").should("have.length.greaterThan", 3);
    });

    it.skip("skip falling test", () => {
        cy.get("ffdfg").should("exist");
    });
});

let currentArticleId: string;

describe("User visits article page", () => {
    beforeEach(() => {
        cy.login();
        cy.createArticle().then((article) => {
            currentArticleId = article.id;
            cy.visit(`/articles/${article.id}`);
        });
    });

    afterEach(() => {
        cy.deleteArticle(currentArticleId);
    });

    // describe("With API", () => {});
    // describe("With stubs", () => {});

    it("and observes article content", () => {
        cy.getByTestId("ArticleDetails.Info").should("exist");
    });

    it("and observes recommendations list", () => {
        cy.getByTestId("ArticleRecommendationsList").should("exist");
    });

    it("and leaves comment", () => {
        cy.getByTestId("ArticleDetails.Info");
        cy.getByTestId("AddCommentForm").scrollIntoView();
        cy.addComment("text");
        cy.getByTestId("CommentCard.Content").should("have.length", 1);
    });

    it("and rates the article", () => {
        cy.getByTestId("ArticleDetails.Info");
        cy.getByTestId("RatingCard").scrollIntoView();
        cy.setRate(5, "test-feedback");
        cy.get("[data-selected=true]").should("have.length", 5);
    });

    it("and rates the article (on stubs)", () => {
        cy.intercept("GET", "**/articles/*", {
            fixture: "article-details.json",
        });
        cy.getByTestId("ArticleDetails.Info");
        cy.getByTestId("RatingCard").scrollIntoView();
        cy.setRate(5, "test-feedback");
        cy.get("[data-selected=true]").should("have.length", 5);
    });
});

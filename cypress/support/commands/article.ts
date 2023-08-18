/* eslint-disable max-len */
import type { Article } from "../../../src/entities/Article";

const defaultArticle = {
    title: "test article",
    subtitle: "News in JS 2023",
    img: "https://www.freepnglogos.com/uploads/javascript-png/javascript-vector-logo-yellow-png-transparent-javascript-vector-12.png",
    views: 1,
    userId: "1",
    createdAt: "26.02.2022",
    type: ["IT"],
    blocks: [],
};

export const createArticle = (article: Article) => {
    return cy
        .request({
            method: "POST",
            url: `http://localhost:8000/articles`,
            headers: { Authorization: `dfojwf` },
            body: article ?? defaultArticle,
        })
        .then((response) => response.body);
};

export const deleteArticle = (articleId: string) => {
    return cy.request({
        method: "DELETE",
        url: `http://localhost:8000/articles/${articleId}`,
        headers: { Authorization: `dfojwf` },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>;
            deleteArticle(articleId: string): Chainable<void>;
        }
    }
}

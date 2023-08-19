/// <reference types="cypress" />

import * as commonCommands from "./commands/common";
import * as profileCommands from "./commands/profile";
import * as articleCommands from "./commands/article";
import * as commentCommands from "./commands/comment";
import * as ratingCommands from "./commands/rating";

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentCommands);
Cypress.Commands.addAll(ratingCommands);
/* Cypress.Commands.overwrite("intercept", () => {
    const { FIXTURE_MODE } = process.env;
    if (FIXTURE_MODE === "READ") {
        readFixture()
    }

    if (FIXTURE_MODE === "WRITE") {
        writeFixture()
    }

    if (FIXTURE_MODE === "API") {
        no fixtures ! (merge to master)
    }
}); */

//

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

export {};

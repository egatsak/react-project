import { EditableProfileCard } from "../../src/features/EditableProfileCard";
import { TestProvider } from "../../src/shared/lib/tests/componentRender/componentRender";

const FIXTURE_USER_ID = "4";

describe("EditableProfileCard.cy.tsx", () => {
    it("playground", () => {
        cy.intercept("GET", "**/profile/*", { fixture: "profile.json" });
        cy.mount(
            <TestProvider
                options={{
                    initialState: {
                        user: {
                            authData: {
                                id: FIXTURE_USER_ID,
                            },
                        },
                    },
                }}
            >
                <EditableProfileCard id={FIXTURE_USER_ID} />
            </TestProvider>
        );
    });
});

import { screen } from "@testing-library/react";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";
import AppRouter from "./AppRouter";
import {
    getRouteAbout,
    getRouteAdminPanel,
    getRouteProfile,
} from "@/shared/const/router";
import { UserRole } from "@/entities/User";

describe("app/router/AppRouter", () => {
    test("Page renders", async () => {
        componentRender(<AppRouter />, {
            route: getRouteAbout(),
        });

        const page = await screen.findByTestId("AboutPage");

        expect(page).toBeInTheDocument();
    });

    test("Page not found", async () => {
        componentRender(<AppRouter />, {
            route: "/fpojwofihjwoef",
        });

        const page = await screen.findByTestId("NotFoundPage");

        expect(page).toBeInTheDocument();
    });

    test("Unauthorized user gets redirected", async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile("1"),
        });

        const page = await screen.findByTestId("MainPage");

        expect(page).toBeInTheDocument();
    });

    test("Authorized user has access to private route page", async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile("1"),
            initialState: {
                user: {
                    _inited: true,
                    authData: {},
                },
            },
        });

        const page = await screen.findByTestId("ProfilePage");

        expect(page).toBeInTheDocument();
    });

    test("Access denied (role is absent)", async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdminPanel(),
            initialState: {
                user: {
                    _inited: true,
                    authData: {
                        roles: [UserRole.USER],
                    },
                },
            },
        });

        const page = await screen.findByTestId("ForbiddenPage");

        expect(page).toBeInTheDocument();
    });

    test("Access granted (role is present)", async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdminPanel(),
            initialState: {
                user: { _inited: true, authData: { roles: [UserRole.ADMIN] } },
            },
        });

        const page = await screen.findByTestId("AdminPanelPage");
        expect(page).toBeInTheDocument();
    });
});

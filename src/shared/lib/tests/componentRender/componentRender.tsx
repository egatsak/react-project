import { ReactNode, Suspense } from "react";
import { DeepPartial } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { render } from "@testing-library/react";
import i18nForTests from "shared/config/i18n/i18nForTests";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";

export interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
}

export function componentRender(
    component: ReactNode,
    options: componentRenderOptions = {}
) {
    const { route = "/", initialState } = options;

    return render(
        <StoreProvider initialState={initialState}>
            <MemoryRouter initialEntries={[route]}>
                <I18nextProvider i18n={i18nForTests}>
                    {component}
                </I18nextProvider>
            </MemoryRouter>
        </StoreProvider>
    );
}

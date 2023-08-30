import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "@/app/providers/StoreProvider";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import { ForceUpdateProvider } from "./shared/lib/render/forceUpdate";
import App from "./app/App";

import "@/shared/config/i18n/i18n";
import "@/app/styles/index.scss";

const container = document.getElementById("root");

if (!container) {
    throw new Error('Root element with id "root" not found');
}

const root = createRoot(container);
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ForceUpdateProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ForceUpdateProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);

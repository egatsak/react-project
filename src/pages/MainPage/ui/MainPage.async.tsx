import { lazy } from "react";

export const MainPageAsync = lazy(() => {
    return import("./MainPage");
});

/* For those who doesn't use default import

const AboutPageLazy = lazy(() => import('./about-page').then(module=>({default:module.AboutPage}))); */

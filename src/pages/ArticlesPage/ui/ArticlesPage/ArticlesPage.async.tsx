import { lazy } from "react";

export const ArticlesPageAsync = lazy(() => {
    return import("./ArticlesPage");
});

/* For those who doesn't use default import

const AboutPageLazy = lazy(() => import('./about-page').then(module=>({default:module.AboutPage}))); */

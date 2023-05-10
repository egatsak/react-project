import { lazy } from "react";

export const ArticleEditPageAsync = lazy(() => {
    return import("./ArticleEditPage");
});

/* For those who doesn't use default import

const AboutPageLazy = lazy(() => import('./about-page').then(module=>({default:module.AboutPage}))); */

import { lazy } from "react";

export const ArticleDetailsPageAsync = lazy(() => {
    return import("./ArticleDetailsPage");
});

/* For those who doesn't use default import

const AboutPageLazy = lazy(() => import('./about-page').then(module=>({default:module.AboutPage}))); */

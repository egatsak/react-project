import { lazy } from "react";
import lazyLoadingTimeout from "shared/lib/lazyLoadingTimeout/lazyLoadingTimeout";

export const ArticleDetailsPageAsync = lazy(() => {
    return lazyLoadingTimeout(import("./ArticleDetailsPage"), 1000);
});

/* For those who doesn't use default import

const AboutPageLazy = lazy(() => import('./about-page').then(module=>({default:module.AboutPage}))); */

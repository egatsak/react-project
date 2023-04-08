import { lazy } from "react";
import lazyLoadingTimeout from "shared/lib/lazyLoadingTimeout/lazyLoadingTimeout";

export const ArticlesPageAsync = lazy(() => {
    return lazyLoadingTimeout(import("./ArticlesPage"), 1000);
});

/* For those who doesn't use default import

const AboutPageLazy = lazy(() => import('./about-page').then(module=>({default:module.AboutPage}))); */

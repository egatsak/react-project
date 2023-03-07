import { lazy } from "react";
import lazyLoadingTimeout from "shared/lib/lazyLoadingTimeout/lazyLoadingTimeout";

export const AboutPageAsync = lazy(() => {
    return lazyLoadingTimeout(import("./AboutPage"), 1000);
});

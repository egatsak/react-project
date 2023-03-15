import { lazy } from "react";
import lazyLoadingTimeout from "shared/lib/lazyLoadingTimeout/lazyLoadingTimeout";

export const ProfilePageAsync = lazy(() => {
    return lazyLoadingTimeout(import("./ProfilePage"), 1000);
});

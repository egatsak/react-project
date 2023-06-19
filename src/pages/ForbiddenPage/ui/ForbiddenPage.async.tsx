import { lazy } from "react";

export const ForbiddenPageAsync = lazy(() => {
    return import("./ForbiddenPage");
});

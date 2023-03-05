import { lazy } from "react";
import lazyLoadingTimeout from "../lazyLoadingTimeout";

export const AboutPageAsync = lazy(() => {
  return lazyLoadingTimeout(import("./AboutPage"), 1000);
});

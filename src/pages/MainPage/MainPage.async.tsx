import { lazy } from "react";
import lazyLoadingTimeout from "../lazyLoadingTimeout";

export const MainPageAsync = lazy(() => {
  return lazyLoadingTimeout(import("./MainPage"), 1000);
});

/* Для тех кто не использует дефолтный импорт

const AboutPageLazy = lazy(() => import('./about-page').then(module=>({default:module.AboutPage}))); */

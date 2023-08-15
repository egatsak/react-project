import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";

import AboutIcon from "@/shared/assets/icons/icon-page-about.svg";
import MainIcon from "@/shared/assets/icons/icon-page-main.svg";
import ProfileIcon from "@/shared/assets/icons/icon-page-profile.svg";
import ArticlesIcon from "@/shared/assets/icons/icon-page-articles.svg";
import { SidebarItemType } from "../types/sidebar";
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from "@/shared/const/router";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            text: "Main",
            icon: MainIcon,
        },
        {
            path: getRouteAbout(),
            text: "About",
            icon: AboutIcon,
        },
    ];

    if (userData) {
        sidebarItemList.push(
            {
                path: getRouteProfile(userData.id),
                text: "Profile",
                icon: ProfileIcon,
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                text: "Articles",
                icon: ArticlesIcon,
                authOnly: true,
            }
        );
    }

    return sidebarItemList;
});

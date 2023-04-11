import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entities/User";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

import AboutIcon from "shared/assets/icons/icon-page-about.svg";
import MainIcon from "shared/assets/icons/icon-page-main.svg";
import ProfileIcon from "shared/assets/icons/icon-page-profile.svg";
import ArticlesIcon from "shared/assets/icons/icon-page-articles.svg";
import { SidebarItemType } from "../types/sidebar";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemList: SidebarItemType[] = [
        {
            path: RoutePath.main,
            text: "Main",
            icon: MainIcon,
        },
        {
            path: RoutePath.about,
            text: "About",
            icon: AboutIcon,
        },
    ];

    if (userData) {
        sidebarItemList.push(
            {
                path: RoutePath.profile + userData.id,
                text: "Profile",
                icon: ProfileIcon,
                authOnly: true,
            },
            {
                path: RoutePath.articles,
                text: "Articles",
                icon: ArticlesIcon,
                authOnly: true,
            }
        );
    }

    return sidebarItemList;
});

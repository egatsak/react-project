import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";

import AboutIconDeprecated from "@/shared/assets/icons/icon-page-about.svg";
import MainIconDeprecated from "@/shared/assets/icons/icon-page-main.svg";
import ProfileIconDeprecated from "@/shared/assets/icons/icon-page-profile.svg";
import ArticleIconDeprecated from "@/shared/assets/icons/icon-page-articles.svg";

import MainIcon from "@/shared/assets/icons/icon-home-redesigned.svg";
import ArticleIcon from "@/shared/assets/icons/icon-article-redesigned.svg";
import ProfileIcon from "@/shared/assets/icons/icon-avatar-redesigned.svg";
import AboutIcon from "@/shared/assets/icons/icon-info-redesigned.svg";
import { SidebarItemType } from "../types/sidebar";
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from "@/shared/const/router";
import { toggleFeatures } from "@/shared/lib/features";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            text: "Main",
            icon: toggleFeatures({
                name: "isAppRedesigned",
                on: () => MainIcon,
                off: () => MainIconDeprecated,
            }),
        },
        {
            path: getRouteAbout(),
            text: "About",
            icon: toggleFeatures({
                name: "isAppRedesigned",
                on: () => AboutIcon,
                off: () => AboutIconDeprecated,
            }),
        },
    ];

    if (userData) {
        sidebarItemList.push(
            {
                path: getRouteProfile(userData.id),
                text: "Profile",
                icon: toggleFeatures({
                    name: "isAppRedesigned",
                    on: () => ProfileIcon,
                    off: () => ProfileIconDeprecated,
                }),
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                text: "Articles",
                icon: toggleFeatures({
                    name: "isAppRedesigned",
                    on: () => ArticleIcon,
                    off: () => ArticleIconDeprecated,
                }),

                authOnly: true,
            },
        );
    }

    return sidebarItemList;
});

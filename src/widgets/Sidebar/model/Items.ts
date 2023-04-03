import React from "react";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import AboutIcon from "shared/assets/icons/icon-page-about.svg";
import MainIcon from "shared/assets/icons/icon-page-main.svg";
import ProfileIcon from "shared/assets/icons/icon-page-profile.svg";

export interface SidebarItemType {
    path: string;
    text: string;
    icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export const SidebarItemList: SidebarItemType[] = [
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
    {
        path: RoutePath.profile,
        text: "Profile",
        icon: ProfileIcon,
        authOnly: true,
    },
];

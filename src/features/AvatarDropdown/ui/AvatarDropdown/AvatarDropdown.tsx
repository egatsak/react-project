import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Dropdown as DropdownDeprecated } from "@/shared/ui/deprecated/Popups";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar/Avatar";
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from "@/entities/User";
import { getRouteAdminPanel, getRouteProfile } from "@/shared/const/router";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ToggleFeatures } from "@/shared/lib/features";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";
import { Dropdown } from "@/shared/ui/redesigned/Popups";

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const authData = useSelector(getUserAuthData);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) {
        return null;
    }

    const items = [
        ...(isAdminPanelAvailable
            ? [
                  {
                      content: t("Admin panel", {
                          ns: "translation",
                      }),
                      href: getRouteAdminPanel(),
                  },
              ]
            : []),
        {
            content: t("Profile", { ns: "translation" }),
            href: getRouteProfile(authData.id),
        },
        {
            content: t("Log-out", { ns: "translation" }),
            onClick: onLogout,
        },
    ];

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Dropdown
                    className={classNames("", {}, [className])}
                    direction="bottom-left"
                    items={items}
                    trigger={<Avatar size={40} src={authData.avatar} />}
                />
            }
            off={
                <DropdownDeprecated
                    className={classNames("", {}, [className])}
                    direction="bottom-left"
                    items={items}
                    trigger={
                        <AvatarDeprecated
                            size={30}
                            src={authData.avatar}
                            fallbackInverted
                        />
                    }
                />
            }
        />
    );
});

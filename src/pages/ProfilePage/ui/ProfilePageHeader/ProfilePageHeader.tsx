import { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

import {
    getProfileData,
    getProfileReadonly,
    profileActions,
    updateProfileData,
} from "entities/Profile";

import { classNames } from "shared/lib/classNames/classNames";

import { getUserAuthData } from "entities/User";
import styles from "./ProfilePageHeader.module.scss";

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();

    const readonly = useSelector(getProfileReadonly);
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <div className={classNames(styles.profilePageHeader, {}, [className])}>
            <Text title={t("Profile", { ns: "profile" })} />
            {canEdit && (
                <div className={styles.btnWrapper}>
                    {readonly ? (
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            className={styles.editBtn}
                            onClick={onEdit}
                        >
                            {t("Edit", { ns: "profile" })}
                        </Button>
                    ) : (
                        <>
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                className={styles.cancelBtn}
                                onClick={onCancelEdit}
                            >
                                {t("Cancel", { ns: "profile" })}
                            </Button>
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onSave}
                            >
                                {t("Save", { ns: "profile" })}
                            </Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

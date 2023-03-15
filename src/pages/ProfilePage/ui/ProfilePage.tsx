import { FC } from "react";
import { useTranslation } from "react-i18next";
import { profileReducer } from "entities/Profile";
import {
    DynamicModuleLoader,
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "shared/lib/classNames/classNames";

const reducers: ReducersList = { profile: profileReducer };

interface ProfilePageProps {
    className?: string;
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation("profile");

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames("", {}, [className])}>
                {t("Profile Page", { ns: "profile" })}
            </div>
        </DynamicModuleLoader>
    );
};
export default ProfilePage;

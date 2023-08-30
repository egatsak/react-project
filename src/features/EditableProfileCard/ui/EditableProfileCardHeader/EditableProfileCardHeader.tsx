import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData } from "@/entities/User";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text/Text";
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { profileActions } from "../../model/slice/profileSlice";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { Card } from "@/shared/ui/redesigned/Card/Card";

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
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
            <HStack
                max
                justify="between"
                className={classNames("", {}, [className])}
            >
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Card border="partial" padding="24" max>
                            <HStack max justify="between">
                                <Text title={t("Profile", { ns: "profile" })} />
                                {canEdit && (
                                    <div>
                                        {readonly ? (
                                            <Button
                                                variant="outline"
                                                onClick={onEdit}
                                                data-testid="EditableProfileCardHeader.EditButton"
                                            >
                                                {t("Edit", { ns: "profile" })}
                                            </Button>
                                        ) : (
                                            <HStack gap="8">
                                                <Button
                                                    variant="outline"
                                                    color="error"
                                                    onClick={onCancelEdit}
                                                    data-testid="EditableProfileCardHeader.CancelButton"
                                                >
                                                    {t("Cancel", {
                                                        ns: "profile",
                                                    })}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={onSave}
                                                    data-testid="EditableProfileCardHeader.SaveButton"
                                                    color="success"
                                                >
                                                    {t("Save", {
                                                        ns: "profile",
                                                    })}
                                                </Button>
                                            </HStack>
                                        )}
                                    </div>
                                )}
                            </HStack>
                        </Card>
                    }
                    off={
                        <>
                            <TextDeprecated
                                title={t("Profile", { ns: "profile" })}
                            />
                            {canEdit && (
                                <div>
                                    {readonly ? (
                                        <ButtonDeprecated
                                            theme={ButtonTheme.OUTLINE}
                                            onClick={onEdit}
                                            data-testid="EditableProfileCardHeader.EditButton"
                                        >
                                            {t("Edit", { ns: "profile" })}
                                        </ButtonDeprecated>
                                    ) : (
                                        <HStack gap="8">
                                            <ButtonDeprecated
                                                theme={ButtonTheme.OUTLINE_RED}
                                                onClick={onCancelEdit}
                                                data-testid="EditableProfileCardHeader.CancelButton"
                                            >
                                                {t("Cancel", { ns: "profile" })}
                                            </ButtonDeprecated>
                                            <ButtonDeprecated
                                                theme={ButtonTheme.OUTLINE}
                                                onClick={onSave}
                                                data-testid="EditableProfileCardHeader.SaveButton"
                                            >
                                                {t("Save", { ns: "profile" })}
                                            </ButtonDeprecated>
                                        </HStack>
                                    )}
                                </div>
                            )}
                        </>
                    }
                />
            </HStack>
        );
    },
);

import { FC } from "react";
import { useTranslation } from "react-i18next";
import { CurrencySelect } from "@/entities/Currency";

import { classNames } from "@/shared/lib/classNames/classNames";
import { CountrySelect } from "@/entities/Country";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";

import { Input } from "@/shared/ui/redesigned/Input/Input";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";
import { ProfileCardProps } from "../ProfileCard/ProfileCard";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import styles from "./ProfileCardRedesigned.module.scss";

export const ProfileCardRedesignedSkeleton = () => {
    return (
        <Card max padding="24">
            <VStack gap="32">
                <HStack max justify="center">
                    <Skeleton border="100%" width={128} height={128} />
                </HStack>
                <HStack gap="32" max>
                    <VStack gap="16" max>
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                    </VStack>
                    <VStack gap="16" max>
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};

export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation();
    return (
        <HStack
            justify="center"
            max
            className={classNames(styles.profileCard, {}, [styles.error])}
        >
            <Text
                variant="error"
                title={t("Profile loading error", {
                    ns: "profile",
                })}
                text={t("Please reload the page", {
                    ns: "profile",
                })}
                align="center"
            />
        </HStack>
    );
};

export const ProfileCardRedesigned: FC<ProfileCardProps> = (props) => {
    const {
        className,
        data,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeCity,
        onChangeAge,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props;

    const { t } = useTranslation("profile");

    return (
        <Card
            padding="24"
            border="partial"
            max
            className={classNames(styles.profileCardRedesigned, {}, [
                className,
            ])}
        >
            {data?.avatar && (
                <HStack
                    justify="center"
                    max
                    className={styles.avatarWrapperRedesigned}
                >
                    <Avatar src={data?.avatar} alt="Avatar" size={120} />
                </HStack>
            )}
            <HStack gap="24">
                <VStack gap="16" max>
                    <Input
                        value={data?.first}
                        label={t("Name", { ns: "profile" })}
                        className={styles.input}
                        onChange={onChangeFirstname}
                        readonly={readonly}
                        data-testid="ProfileCard.firstname"
                    />
                    <Input
                        value={data?.lastname}
                        label={t("Lastname", { ns: "profile" })}
                        className={styles.input}
                        onChange={onChangeLastname}
                        readonly={readonly}
                        data-testid="ProfileCard.lastname"
                    />
                    <Input
                        type="number"
                        value={data?.age}
                        label={t("Age", { ns: "profile" })}
                        className={styles.input}
                        onChange={onChangeAge}
                        readonly={readonly}
                        data-testid="ProfileCard.age"
                    />
                    <Input
                        value={data?.city}
                        label={t("City", { ns: "profile" })}
                        className={styles.input}
                        onChange={onChangeCity}
                        readonly={readonly}
                    />
                </VStack>

                <VStack gap="16" max>
                    <Input
                        value={data?.username}
                        label={t("Username", { ns: "profile" })}
                        className={styles.input}
                        onChange={onChangeUsername}
                        readonly={readonly}
                    />
                    <Input
                        value={data?.avatar}
                        label={t("Avatar", { ns: "profile" })}
                        className={styles.input}
                        onChange={onChangeAvatar}
                        readonly={readonly}
                    />
                    <CurrencySelect
                        className={styles.input}
                        value={data?.currency}
                        onChange={onChangeCurrency}
                        readonly={readonly}
                    />
                    <CountrySelect
                        className={styles.input}
                        value={data?.country}
                        onChange={onChangeCountry}
                        readonly={readonly}
                    />
                </VStack>
            </HStack>
        </Card>
    );
};

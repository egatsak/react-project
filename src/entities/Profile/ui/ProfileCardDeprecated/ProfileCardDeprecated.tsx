import { FC } from "react";
import { useTranslation } from "react-i18next";

import { CurrencySelect } from "@/entities/Currency";
import { CountrySelect } from "@/entities/Country";
import { Loader as LoaderDeprecated } from "@/shared/ui/deprecated/Loader/Loader";
import {
    Text as TextDeprecated,
    TextAlign,
    TextTheme,
} from "@/shared/ui/deprecated/Text/Text";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input/Input";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar/Avatar";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";

import { ProfileCardProps } from "../ProfileCard/ProfileCard";
import styles from "./ProfileCardDeprecated.module.scss";

export const ProfileCardDeprecatedLoader = () => {
    return (
        <HStack
            max
            justify="center"
            className={classNames(styles.profileCard, {}, [styles.loading])}
        >
            <LoaderDeprecated />
        </HStack>
    );
};

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation();

    return (
        <HStack
            justify="center"
            max
            className={classNames(styles.profileCard, {}, [styles.error])}
        >
            <TextDeprecated
                theme={TextTheme.ERROR}
                title={t("Profile loading error", {
                    ns: "profile",
                })}
                text={t("Please reload the page", {
                    ns: "profile",
                })}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};

export const ProfileCardDeprecated: FC<ProfileCardProps> = (props) => {
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

    const mods: Mods = {
        [styles.editing]: !readonly,
    };

    return (
        <VStack
            gap="16"
            max
            align="stretch"
            className={classNames(styles.profileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack justify="center" max className={styles.avatarWrapper}>
                    <AvatarDeprecated src={data?.avatar} alt="Avatar" />
                </HStack>
            )}
            <InputDeprecated
                inputId="first-name"
                value={data?.first}
                placeholder={t("Name", { ns: "profile" })}
                className={styles.input}
                onChange={onChangeFirstname}
                readonly={readonly}
                data-testid="ProfileCard.firstname"
            />
            <InputDeprecated
                inputId="last-name"
                value={data?.lastname}
                placeholder={t("Lastname", { ns: "profile" })}
                className={styles.input}
                onChange={onChangeLastname}
                readonly={readonly}
                data-testid="ProfileCard.lastname"
            />
            <InputDeprecated
                inputId="age"
                type="number"
                value={data?.age}
                placeholder={t("Age", { ns: "profile" })}
                className={styles.input}
                onChange={onChangeAge}
                readonly={readonly}
                data-testid="ProfileCard.age"
            />
            <InputDeprecated
                inputId="city"
                value={data?.city}
                placeholder={t("City", { ns: "profile" })}
                className={styles.input}
                onChange={onChangeCity}
                readonly={readonly}
            />
            <InputDeprecated
                inputId="username"
                value={data?.username}
                placeholder={t("Username", { ns: "profile" })}
                className={styles.input}
                onChange={onChangeUsername}
                readonly={readonly}
            />
            <InputDeprecated
                inputId="avatar"
                value={data?.avatar}
                placeholder={t("Avatar", { ns: "profile" })}
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
    );
};

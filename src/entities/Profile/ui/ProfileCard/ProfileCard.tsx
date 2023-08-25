import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Currency, CurrencySelect } from "@/entities/Currency";
import { Text, TextAlign, TextTheme } from "@/shared/ui/deprecated/Text/Text";
import { Input } from "@/shared/ui/deprecated/Input/Input";
import { Loader } from "@/shared/ui/deprecated/Loader/Loader";
import { Avatar } from "@/shared/ui/deprecated/Avatar/Avatar";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import { Country, CountrySelect } from "@/entities/Country";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Profile } from "../../model/types/profile";

import styles from "./ProfileCard.module.scss";

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeFirstname?: (value?: string) => void;
    onChangeLastname?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
    const {
        className,
        data,
        error,
        isLoading,
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

    if (isLoading) {
        return (
            <HStack
                max
                justify="center"
                className={classNames(styles.profileCard, {}, [
                    className,
                    styles.loading,
                ])}
            >
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack
                justify="center"
                max
                className={classNames(styles.profileCard, {}, [
                    className,
                    styles.error,
                ])}
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t("Profile loading error", { ns: "profile" })}
                    text={t("Please reload the page", { ns: "profile" })}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

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
                    <Avatar src={data?.avatar} alt="Avatar" />
                </HStack>
            )}
            <Input
                inputId="first-name"
                value={data?.first}
                placeholder={t("Name", { ns: "profile" })}
                className={styles.input}
                onChange={onChangeFirstname}
                readonly={readonly}
                data-testid="ProfileCard.firstname"
            />
            <Input
                inputId="last-name"
                value={data?.lastname}
                placeholder={t("Lastname", { ns: "profile" })}
                className={styles.input}
                onChange={onChangeLastname}
                readonly={readonly}
                data-testid="ProfileCard.lastname"
            />
            <Input
                inputId="age"
                type="number"
                value={data?.age}
                placeholder={t("Age", { ns: "profile" })}
                className={styles.input}
                onChange={onChangeAge}
                readonly={readonly}
                data-testid="ProfileCard.age"
            />
            <Input
                inputId="city"
                value={data?.city}
                placeholder={t("City", { ns: "profile" })}
                className={styles.input}
                onChange={onChangeCity}
                readonly={readonly}
            />
            <Input
                inputId="username"
                value={data?.username}
                placeholder={t("Username", { ns: "profile" })}
                className={styles.input}
                onChange={onChangeUsername}
                readonly={readonly}
            />
            <Input
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

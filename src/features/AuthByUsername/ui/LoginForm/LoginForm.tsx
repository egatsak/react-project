import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { Button } from "shared/ui/Button/Button";

import { classNames } from "shared/lib/classNames/classNames";
import styles from "./LoginForm.module.scss";

interface LoginFormProps {
    className?: string;
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
    const { t } = useTranslation("translation");

    return (
        <div className={classNames(styles.loginForm, {}, [className])}>
            <Input
                // eslint-disable-next-line i18next/no-literal-string
                inputId="login"
                type="text"
                className={styles.input}
                autoFocus
                placeholder={t("Login", { ns: "translation" })}
            />
            <Input
                // eslint-disable-next-line i18next/no-literal-string
                inputId="password"
                type="text"
                className={styles.input}
                placeholder={t("Password", { ns: "translation" })}
            />
            <Button className={styles.loginBtn}>
                {t("Log-in", { ns: "translation" })}
            </Button>
        </div>
    );
};

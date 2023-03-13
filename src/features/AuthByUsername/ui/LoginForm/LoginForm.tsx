import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { classNames } from "shared/lib/classNames/classNames";

import { Text, TextTheme } from "shared/ui/Text/Text";
import { loginByUsername } from "../../services/loginByUsername";
import { loginActions } from "../../model/slice/loginSlice";
import { getLoginState } from "../../model/selectors/getLoginState/getLoginState";
import styles from "./LoginForm.module.scss";

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation("translation");
    const { username, password, isLoading, error } = useSelector(getLoginState);
    const dispatch = useDispatch();

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch]
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch]
    );

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, username, password]);

    return (
        <div className={classNames(styles.loginForm, {}, [className])}>
            <Text title={t("Authorization form", { ns: "translation" })} />
            {error && (
                <Text
                    text={t(error, { ns: "translation" })}
                    theme={TextTheme.ERROR}
                />
            )}
            <Input
                // eslint-disable-next-line i18next/no-literal-string
                inputId="login"
                type="text"
                className={styles.input}
                autofocus
                placeholder={t("Login", { ns: "translation" })}
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                // eslint-disable-next-line i18next/no-literal-string
                inputId="password"
                type="text"
                className={styles.input}
                placeholder={t("Password", { ns: "translation" })}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={styles.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t("Log-in", { ns: "translation" })}
            </Button>
        </div>
    );
});

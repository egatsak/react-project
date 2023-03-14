import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { classNames } from "shared/lib/classNames/classNames";
import { Text, TextTheme } from "shared/ui/Text/Text";

import {
    DynamicModuleLoader,
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { loginByUsername } from "../../services/loginByUsername";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";

import styles from "./LoginForm.module.scss";

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

export interface LoginFormProps {
    className?: string;
}

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation("translation");
    const dispatch = useDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

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
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
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
        </DynamicModuleLoader>
    );
});

export default LoginForm;

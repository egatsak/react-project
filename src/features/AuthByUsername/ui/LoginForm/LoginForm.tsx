import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input/Input";
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
    Text as TextDeprecated,
    TextTheme,
} from "@/shared/ui/deprecated/Text/Text";

import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { loginByUsername } from "../../model/services/loginByUsername";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";

import styles from "./LoginForm.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { useForceUpdate } from "@/shared/lib/render/forceUpdate";

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

export interface LoginFormProps {
    onSuccess: () => void;
    className?: string;
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation("translation");
    const forceUpdate = useForceUpdate();
    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === "fulfilled") {
            onSuccess();
            forceUpdate();
        }
    }, [dispatch, username, password, onSuccess, forceUpdate]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <VStack gap="16" className={styles.loginFormRedesigned}>
                        <Text
                            title={t("Authorization form", {
                                ns: "translation",
                            })}
                        />
                        {error && (
                            <Text
                                text={t(error, { ns: "translation" })}
                                variant="error"
                            />
                        )}
                        <Input
                            type="text"
                            autofocus
                            placeholder={t("Login", { ns: "translation" })}
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <Input
                            type="text"
                            placeholder={t("Password", { ns: "translation" })}
                            onChange={onChangePassword}
                            value={password}
                        />
                        <Button
                            variant="outline"
                            className={styles.loginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t("Log-in", { ns: "translation" })}
                        </Button>
                    </VStack>
                }
                off={
                    <div
                        className={classNames(styles.loginForm, {}, [
                            className,
                        ])}
                    >
                        <TextDeprecated
                            title={t("Authorization form", {
                                ns: "translation",
                            })}
                        />
                        {error && (
                            <TextDeprecated
                                text={t(error, { ns: "translation" })}
                                theme={TextTheme.ERROR}
                            />
                        )}
                        <InputDeprecated
                            inputId="login"
                            type="text"
                            className={styles.input}
                            autofocus
                            placeholder={t("Login", { ns: "translation" })}
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <InputDeprecated
                            inputId="password"
                            type="text"
                            className={styles.input}
                            placeholder={t("Password", { ns: "translation" })}
                            onChange={onChangePassword}
                            value={password}
                        />
                        <ButtonDeprecated
                            theme={ButtonTheme.OUTLINE}
                            className={styles.loginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t("Log-in", { ns: "translation" })}
                        </ButtonDeprecated>
                    </div>
                }
            />
        </DynamicModuleLoader>
    );
});

export default LoginForm;

import React, { memo, useEffect, useRef, useState } from "react";

import { Mods, classNames } from "@/shared/lib/classNames/classNames";
import { HStack } from "../Stack";
import { Text } from "../Text/Text";
import styles from "./Input.module.scss";

type HTMLInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "readOnly" | "size"
>;

type InputSize = "s" | "m" | "l";

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
    addonLeft?: React.ReactNode;
    addonRight?: React.ReactNode;
    label?: string;
    size?: InputSize;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = "text",
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        label,
        size = "m",
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);

    const [isFocused, setIsFocused] = useState(false);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const mods: Mods = {
        [styles.readonly]: readonly,
        [styles.focused]: isFocused,
        [styles.withAddonLeft]: Boolean(addonLeft),
        [styles.withAddonRight]: Boolean(addonRight),
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const input = (
        <div
            className={classNames(styles.inputWrapper, mods, [
                className,
                styles[size],
            ])}
        >
            {addonLeft && <div className={styles.addonLeft}>{addonLeft}</div>}
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={changeHandler}
                onFocus={onFocus}
                onBlur={onBlur}
                className={classNames(styles.input)}
                readOnly={readonly}
                {...otherProps}
            />
            {addonRight && (
                <div className={styles.addonRight}>{addonRight}</div>
            )}
        </div>
    );

    if (label) {
        return (
            <HStack max gap="8">
                <Text text={label} />
                {input}
            </HStack>
        );
    }

    return input;
});

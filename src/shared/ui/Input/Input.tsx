import React, { InputHTMLAttributes, memo, useEffect, useRef } from "react";

import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Input.module.scss";

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "readOnly"
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    inputId?: string;
    readonly?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = "text",
        placeholder,
        autofocus,
        inputId,
        readonly,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    useEffect(() => {
        if (autofocus) {
            ref.current?.focus();
        }
    }, [autofocus]);

    return (
        <div className={classNames(styles.inputWrapper, {}, [className])}>
            {placeholder && inputId && (
                <label
                    htmlFor={inputId}
                    className={styles.placeholder}
                >{`${placeholder}>`}</label>
            )}
            <input
                id={inputId}
                ref={ref}
                type={type}
                value={value}
                onChange={changeHandler}
                className={classNames(styles.input, {
                    [styles.readonly]: readonly,
                })}
                readOnly={readonly}
                {...otherProps}
            />
        </div>
    );
});

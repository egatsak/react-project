import {
    ButtonHTMLAttributes,
    ForwardedRef,
    ReactNode,
    forwardRef,
} from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import styles from "./Button.module.scss";

export type ButtonVariant = "clear" | "outline" | "filled";

export type ButtonColor = "normal" | "success" | "error";

export type ButtonSize = "m" | "l" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    square?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    color?: ButtonColor;
    children?: ReactNode;
    fullWidth?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    disabled?: boolean;
}

export const Button = forwardRef(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            className,
            children,
            variant = "clear",
            size = "m",
            color = "normal",
            square,
            disabled,
            fullWidth,
            addonLeft,
            addonRight,
            ...otherProps
        } = props;

        const mods: Mods = {
            [styles.square]: square,
            [styles.fullWidth]: fullWidth,
            [styles.disabled]: disabled,
            [styles.withAddon]: Boolean(addonLeft || addonRight),
        };

        return (
            <button
                type="button"
                className={classNames(styles.button, mods, [
                    className,
                    styles[variant],
                    styles[size],
                    styles[color],
                ])}
                disabled={disabled}
                {...otherProps}
                ref={ref}
            >
                {addonLeft && (
                    <div className={styles.addonLeft}>{addonLeft}</div>
                )}
                {children}
                {addonRight && (
                    <div className={styles.addonRight}>{addonRight}</div>
                )}
            </button>
        );
    },
);

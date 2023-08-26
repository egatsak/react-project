import { ButtonHTMLAttributes, memo, ReactNode } from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import styles from "./Button.module.scss";

export type ButtonVariant = "clear" | "outline" | "filled";

export type ButtonSize = "m" | "l" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    square?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    children?: ReactNode;
    fullWidth?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        variant = "clear",
        size = "m",
        square,
        fullWidth,
        addonLeft,
        addonRight,
        ...otherProps
    } = props;

    const mods: Mods = {
        [styles.square]: square,
        [styles.fullWidth]: fullWidth,
        [styles.withAddon]: Boolean(addonLeft || addonRight),
    };

    return (
        <button
            type="button"
            className={classNames(styles.button, mods, [
                className,
                styles[variant],
                styles[size],
            ])}
            {...otherProps}
        >
            {addonLeft && <div className={styles.addonLeft}>{addonLeft}</div>}
            {children}
            {addonRight && (
                <div className={styles.addonRight}>{addonRight}</div>
            )}
        </button>
    );
});

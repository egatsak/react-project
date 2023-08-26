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
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        variant = "clear",
        size = "m",
        square,
        fullWidth,
        ...otherProps
    } = props;

    const mods: Mods = {
        [styles.square]: square,
        [styles.fullWidth]: fullWidth,
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
            {children}
        </button>
    );
});

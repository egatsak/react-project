import React, { HTMLAttributes } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import styles from "./Card.module.scss";

export type CardVariant = "normal" | "outlined" | "light";

export type CardPadding = "0" | "8" | "16" | "24";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    variant?: CardVariant;
    children: React.ReactNode;
    max?: boolean;
    padding?: CardPadding;
}

const mapPaddingToClass: Record<CardPadding, string> = {
    "0": "gap_0",
    "8": "gap_8",
    "16": "gap_16",
    "24": "gap_24",
};

export const Card = (props: CardProps) => {
    const {
        className,
        children,
        variant = "normal",
        max,
        padding = "8",
        ...otherProps
    } = props;

    const paddingClass = mapPaddingToClass[padding];

    return (
        <div
            className={classNames(
                styles.card,
                {
                    [styles.fullWidth]: max,
                },
                [className, styles[variant], styles[paddingClass]],
            )}
            {...otherProps}
        >
            {children}
        </div>
    );
};

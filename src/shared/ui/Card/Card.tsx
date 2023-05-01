import React, { HTMLAttributes } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import styles from "./Card.module.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: React.ReactNode;
}

export const Card = (props: CardProps) => {
    const { className, children, ...otherProps } = props;
    return (
        <div
            className={classNames(styles.card, {}, [className])}
            {...otherProps}
        >
            {children}
        </div>
    );
};

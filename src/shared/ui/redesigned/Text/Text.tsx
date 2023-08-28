import { memo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import styles from "./Text.module.scss";

export type TextVariant = "primary" | "error" | "accent";

export type TextAlign = "left" | "center" | "right";

export type TextSize = "s" | "m" | "l";

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    bold?: boolean;
    align?: TextAlign;
    size?: TextSize;
    "data-testid"?: string;
}

type HeaderTagType = "h1" | "h2" | "h3";

const mapSizeToClass: Record<TextSize, string> = {
    s: styles.size_s,
    m: styles.size_m,
    l: styles.size_l,
};

const mapSizeToHeadingTag: Record<TextSize, HeaderTagType> = {
    s: "h3",
    m: "h2",
    l: "h1",
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        variant = "primary",
        align = "left",
        size = "m",
        bold = false,
        "data-testid": dataTestId = "Text",
    } = props;

    const HeaderTag = mapSizeToHeadingTag[size];
    const sizeClass = mapSizeToClass[size];

    return (
        <div
            className={classNames(styles.textWrapper, { [styles.bold]: bold }, [
                className,
                sizeClass,
                styles[variant],
                styles[align],
            ])}
        >
            {title && (
                <HeaderTag
                    className={styles.title}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p
                    className={styles.text}
                    data-testid={`${dataTestId}.Paragraph`}
                >
                    {text}
                </p>
            )}
        </div>
    );
});

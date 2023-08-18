import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { Mods, classNames } from "@/shared/lib/classNames/classNames";
import styles from "./Flex.module.scss";

export type FlexJustify =
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "evenly";

export type FlexAlign = "start" | "end" | "center" | "stretch";

export type FlexDirection = "row" | "column";

export type FlexGap = "4" | "8" | "16" | "32";

const justifyClasses: Record<FlexJustify, string> = {
    start: styles.justifyStart,
    end: styles.justifyEnd,
    center: styles.justifyCenter,
    between: styles.justifyBetween,
    around: styles.justifyAround,
    evenly: styles.justifyEvenly,
};

const alignClasses: Record<FlexAlign, string> = {
    start: styles.alignStart,
    end: styles.alignEnd,
    center: styles.alignCenter,
    stretch: styles.alignStretch,
};

const directionClasses: Record<FlexDirection, string> = {
    row: styles.directionRow,
    column: styles.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
    "4": styles.gap4,
    "8": styles.gap8,
    "16": styles.gap16,
    "32": styles.gap32,
};

type DivProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export interface FlexProps extends DivProps {
    direction: FlexDirection;
    className?: string;
    children: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    gap?: FlexGap;
    max?: boolean;
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = "start",
        align = "center",
        direction = "row",
        gap,
        max,
        ...otherProps
    } = props;

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

    const mods: Mods = {
        [styles.max]: max,
    };

    return (
        <div className={classNames(styles.flex, mods, classes)} {...otherProps}>
            {children}
        </div>
    );
};

import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import styles from "./Icon.module.scss";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    className?: string;
    inverted?: boolean;
}

/**
 * @deprecated
 * Please use redesigned UI components instead
 */
export const Icon = memo((props: IconProps) => {
    const { className, Svg, inverted, ...otherProps } = props;

    return (
        <Svg
            className={classNames(
                inverted ? styles.inverted : styles.icon,
                {},
                [className],
            )}
            {...otherProps}
        />
    );
});

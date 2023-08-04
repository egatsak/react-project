import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import styles from "./Icon.module.scss";

interface IconProps {
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    className?: string;
    inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
    const { className, Svg, inverted } = props;

    return (
        <Svg
            className={classNames(
                inverted ? styles.inverted : styles.icon,
                {},
                [className]
            )}
        />
    );
});

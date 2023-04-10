import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";

import styles from "./Icon.module.scss";

interface IconProps {
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    className?: string;
}

export const Icon = memo((props: IconProps) => {
    const { className, Svg } = props;

    return <Svg className={classNames(styles.icon, {}, [className])} />;
});

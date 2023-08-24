import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import styles from "./Icon.module.scss";

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, "onClick">;

interface IconBaseProps extends SvgProps {
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    className?: string;
}

interface IconNonClickableProps extends IconBaseProps {
    clickable?: false;
}

interface IconClickableProps extends IconBaseProps {
    clickable: true;
    onClick: () => void;
}

type IconProps = IconNonClickableProps | IconClickableProps;

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        width = 32,
        height = 32,
        clickable,
        ...otherProps
    } = props;

    const icon = (
        <Svg
            className={classNames(styles.icon, {}, [className])}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                className={styles.button}
                onClick={props.onClick}
                style={{ width, height }}
            >
                {icon}
            </button>
        );
    }

    return icon;
});

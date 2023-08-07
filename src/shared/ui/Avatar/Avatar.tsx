import { CSSProperties, FC, useMemo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import styles from "./Avatar.module.scss";

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar: FC<AvatarProps> = (props) => {
    const { className, src, size, alt } = props;

    const style = useMemo<CSSProperties>(() => {
        return { width: size ?? 100, height: size ?? 100 };
    }, [size]);

    return (
        <img
            src={src}
            alt={alt}
            style={style}
            className={classNames(styles.avatar, {}, [className])}
        />
    );
};

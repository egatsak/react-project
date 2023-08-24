import { CSSProperties, FC, useMemo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import { AppImage } from "../AppImage/AppImage";
import { Icon } from "../Icon/Icon";
import { Skeleton } from "../Skeleton/Skeleton";
import UserIcon from "../../../assets/icons/icon-avatar-unknown.svg";

import styles from "./Avatar.module.scss";

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
}

/**
 * @deprecated
 * Please use redesigned UI components instead
 */
export const Avatar: FC<AvatarProps> = (props) => {
    const { className, src, size = 100, alt, fallbackInverted } = props;

    const style = useMemo<CSSProperties>(() => {
        return { width: size, height: size };
    }, [size]);

    const fallback = <Skeleton width={size} height={size} border="50%" />;
    const errorFallback = (
        <Icon
            inverted={fallbackInverted}
            width={size}
            height={size}
            Svg={UserIcon}
        />
    );

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            src={src}
            alt={alt}
            style={style}
            className={classNames(styles.avatar, {}, [className])}
        />
    );
};

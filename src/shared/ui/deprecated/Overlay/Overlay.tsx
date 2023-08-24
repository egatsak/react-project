import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import styles from "./Overlay.module.scss";

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

/**
 * @deprecated
 * Please use redesigned UI components instead
 */
export const Overlay = memo((props: OverlayProps) => {
    const { className, onClick } = props;

    return (
        <div
            onClick={onClick}
            className={classNames(styles.overlay, {}, [className])}
        />
    );
});

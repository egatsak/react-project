import { useTheme } from "app/providers/ThemeProvider";
import { ReactNode, memo, useCallback, useEffect } from "react";
import { Mods, classNames } from "shared/lib/classNames/classNames";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";
import styles from "./Drawer.module.scss";

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
    const { className, children, isOpen, onClose } = props;
    const { theme } = useTheme();

    const mods: Mods = {
        [styles.opened]: isOpen,
    };

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose?.();
            }
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return (
        <Portal>
            <div
                className={classNames(styles.drawer, mods, [
                    className,
                    theme,
                    "app_drawer",
                ])}
            >
                <Overlay onClick={onClose} />
                <div className={styles.content}>{children}</div>
            </div>
        </Portal>
    );
});

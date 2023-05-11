import { useTheme } from "app/providers/ThemeProvider";
import React, { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import { Portal } from "../Portal/Portal";
import styles from "./Modal.module.scss";

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

export const Modal: FC<ModalProps> = (props) => {
    const { className, isOpen, onClose, lazy, children } = props;

    const { theme } = useTheme();

    const [isMounted, setIsMounted] = useState(false);

    const mods: Mods = {
        [styles.opened]: isOpen,
    };

    const closeHandler = useCallback(() => {
        onClose?.();
    }, [onClose]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeHandler();
            }
        },
        [closeHandler]
    );

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
        /* 
        return () => {
            setIsMounted(false);
        }; */
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div
                className={classNames(styles.modal, mods, [
                    className,
                    theme,
                    "app_modal",
                ])}
            >
                <div className={styles.overlay} onClick={closeHandler}>
                    <div
                        className={classNames(styles.content)}
                        onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};

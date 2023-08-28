import { FC, ReactNode } from "react";
import { Mods, classNames } from "@/shared/lib/classNames/classNames";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Overlay } from "../Overlay/Overlay";
import { Portal } from "../Portal/Portal";
import styles from "./Modal.module.scss";
import { toggleFeatures } from "@/shared/lib/features";

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = (props) => {
    const { className, isOpen, onClose, lazy, children } = props;
    const { theme } = useTheme();

    const { isMounted, close, isClosing } = useModal({
        isOpen,
        onClose,
        animationDelay: ANIMATION_DELAY,
    });

    const mods: Mods = {
        [styles.opened]: isOpen,
        [styles.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal element={document.getElementById("app") ?? document.body}>
            <div
                className={classNames(styles.modal, mods, [
                    className,
                    theme,
                    "app_modal",
                    toggleFeatures({
                        name: "isAppRedesigned",
                        on: () => styles.modalRedesigned,
                        off: () => styles.modalOld,
                    }),
                ])}
            >
                <Overlay onClick={close} />
                <div className={classNames(styles.content)}>{children}</div>
            </div>
        </Portal>
    );
};

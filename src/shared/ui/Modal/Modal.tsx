import { useTheme } from "app/providers/ThemeProvider";
import { FC, ReactNode } from "react";
import { Mods, classNames } from "shared/lib/classNames/classNames";
import { useModal } from "shared/lib/hooks/useModal/useModal";
import { Overlay } from "../Overlay/Overlay";
import { Portal } from "../Portal/Portal";
import styles from "./Modal.module.scss";

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
        <Portal>
            <div
                className={classNames(styles.modal, mods, [
                    className,
                    theme,
                    "app_modal",
                ])}
            >
                <Overlay onClick={close} />
                <div className={classNames(styles.content)}>{children}</div>
            </div>
        </Portal>
    );
};

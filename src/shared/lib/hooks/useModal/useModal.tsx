import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

interface UseModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    animationDelay: number;
}

export function useModal(props: UseModalProps) {
    const { isOpen, onClose, animationDelay } = props;

    const [isMounted, setIsMounted] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef() as MutableRefObject<
        ReturnType<typeof setTimeout>
    >;

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                close();
            }
        },
        [close]
    );

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }

        return () => {
            setIsMounted(false);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return {
        isClosing,
        isMounted,
        close,
    };
}

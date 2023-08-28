import { FC, Suspense } from "react";
import { Modal } from "@/shared/ui/redesigned/Modal/Modal";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Loader } from "@/shared/ui/deprecated/Loader/Loader";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = (props) => {
    const { className, isOpen, onClose } = props;

    return (
        <Modal
            className={classNames("", {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <Suspense fallback={<Loader />}>
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
};

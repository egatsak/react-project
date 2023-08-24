import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactNode;
    element?: HTMLElement;
}

/**
 * @deprecated
 * Please use redesigned UI components instead
 */
export const Portal: FC<PortalProps> = ({
    children,
    element = document.body,
}) => {
    return createPortal(children, element);
};

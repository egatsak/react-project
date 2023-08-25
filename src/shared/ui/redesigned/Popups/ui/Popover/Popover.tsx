import { ReactNode, useMemo } from "react";
import { Popover as HPopover } from "@headlessui/react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DropdownDirection } from "@/shared/types/ui";
import { mapDirectionToClass } from "../../styles/consts";

import styles from "./Popover.module.scss";
import popupStyles from "../../styles/popup.module.scss";

interface PopoverProps {
    trigger: ReactNode;
    children: ReactNode;
    className?: string;
    direction?: DropdownDirection;
}

export function Popover(props: PopoverProps) {
    const { className, trigger, children, direction = "bottom-right" } = props;

    const menuClasses = useMemo(
        () => [mapDirectionToClass[direction], popupStyles.menu],
        [direction],
    );

    return (
        <HPopover
            className={classNames(styles.popover, {}, [
                className,
                popupStyles.popup,
            ])}
        >
            <HPopover.Button as="div" className={popupStyles.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel
                className={classNames(styles.panel, {}, menuClasses)}
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    );
}

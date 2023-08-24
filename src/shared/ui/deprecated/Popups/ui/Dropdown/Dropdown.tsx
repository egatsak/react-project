import { Menu } from "@headlessui/react";
import { Fragment, ReactNode, useMemo } from "react";
import { DropdownDirection } from "@/shared/types/ui";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink } from "../../../AppLink/AppLink";
import { mapDirectionToClass } from "../../styles/consts";
import styles from "./Dropdown.module.scss";
import popupStyles from "../../styles/popup.module.scss";

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger?: ReactNode;
    direction?: DropdownDirection;
}

/**
 * @deprecated
 * Please use redesigned UI components instead
 */
export function Dropdown(props: DropdownProps) {
    const { className, trigger, items, direction = "bottom-right" } = props;

    const menuClasses = useMemo(
        () => [mapDirectionToClass[direction]],
        [direction],
    );

    return (
        <Menu
            as="div"
            className={classNames("", {}, [className, popupStyles.popup])}
        >
            <Menu.Button className={popupStyles.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(styles.menu, {}, menuClasses)}>
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(styles.item, {
                                [popupStyles.active]: active,
                            })}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item
                                key={item.href}
                                refName="href"
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }
                    return (
                        <Menu.Item
                            as={Fragment}
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            disabled={item.disabled}
                        >
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
}

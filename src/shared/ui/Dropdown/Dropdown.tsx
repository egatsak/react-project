import { Menu } from "@headlessui/react";
import { classNames } from "shared/lib/classNames/classNames";
import { Fragment, ReactNode, useMemo } from "react";
import { DropdownDirection } from "shared/types/ui";
import styles from "./Dropdown.module.scss";
import { AppLink } from "../AppLink/AppLink";

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

const mapDirectionToClass: Record<DropdownDirection, string> = {
    "top-left": styles.optionsTopLeft,
    "bottom-left": styles.optionsBottomLeft,
    "top-right": styles.optionsTopRight,
    "bottom-right": styles.optionsBottomRight,
};

export function Dropdown(props: DropdownProps) {
    const { className, trigger, items, direction = "bottom-right" } = props;

    const menuClasses = useMemo(
        () => [mapDirectionToClass[direction]],
        [direction]
    );

    return (
        <Menu as="div" className={classNames(styles.dropdown, {}, [className])}>
            <Menu.Button className={styles.btn}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(styles.menu, {}, menuClasses)}>
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(styles.item, {
                                [styles.active]: active,
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

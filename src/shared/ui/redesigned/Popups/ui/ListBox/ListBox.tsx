import { Fragment, ReactNode, useMemo } from "react";
import { Listbox as HListBox } from "@headlessui/react";

import { classNames } from "@/shared/lib/classNames/classNames";
import { DropdownDirection } from "@/shared/types/ui";
import { Button } from "../../../Button/Button";
import { HStack } from "../../../Stack";
import { mapDirectionToClass } from "../../styles/consts";
import ArrowIcon from "@/shared/assets/icons/icon-arrow-bottom-redesigned.svg";

import styles from "./ListBox.module.scss";
import popupStyles from "../../styles/popup.module.scss";
import { Icon } from "../../../Icon/Icon";

export interface ListBoxItem<T extends string> {
    value: T;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    items?: ListBoxItem<T>[];
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    label?: string;
    direction?: DropdownDirection;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        items,
        className,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = "bottom-right",
        label,
    } = props;

    const optionsClasses: [string, string] = useMemo(
        () => [mapDirectionToClass[direction], popupStyles.menu],
        [direction],
    );

    const selectedItem = useMemo(() => {
        return items?.find((item) => item.value === value);
    }, [items, value]);

    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}
            <HListBox
                as="div"
                className={classNames(styles.listBox, {}, [
                    className,
                    popupStyles.popup,
                ])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBox.Button className={styles.trigger} as="div">
                    <Button
                        variant="filled"
                        disabled={readonly}
                        addonRight={<Icon Svg={ArrowIcon} />}
                    >
                        {selectedItem?.content ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options
                    className={classNames(styles.options, {}, optionsClasses)}
                >
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(styles.item, {
                                        [popupStyles.active]: active,
                                        [popupStyles.disabled]: item.disabled,
                                        [popupStyles.selected]: selected,
                                    })}
                                >
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
}

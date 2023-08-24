import { Fragment, ReactNode, useMemo } from "react";
import { Listbox as HListBox } from "@headlessui/react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { DropdownDirection } from "@/shared/types/ui";
import { Button } from "../../../Button/Button";
import { HStack } from "../../../Stack";
import { mapDirectionToClass } from "../../styles/consts";

import styles from "./ListBox.module.scss";
import popupStyles from "../../styles/popup.module.scss";

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: <T extends string>(value: T) => void;
    readonly?: boolean;
    label?: string;
    direction?: DropdownDirection;
}

/**
 * @deprecated
 * Please use redesigned UI components instead
 */
export function ListBox(props: ListBoxProps) {
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

    const optionsClasses = useMemo(
        () => [mapDirectionToClass[direction]],
        [direction],
    );

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
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
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
                                    })}
                                >
                                    {selected && "✓"}
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

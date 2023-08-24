import { ChangeEvent, useMemo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import styles from "./Select.module.scss";

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

/**
 * @deprecated
 * Please use redesigned UI components instead
 */
export const Select = <T extends string>(props: SelectProps<T>) => {
    const { className, label, options, value, onChange, readonly } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
    };

    const optionsList = useMemo(() => {
        return options?.map((opt) => (
            <option className={styles.option} value={opt.value} key={opt.value}>
                {opt.content}
            </option>
        ));
    }, [options]);

    return (
        <div className={classNames(styles.wrapper, {}, [className])}>
            {label && <span className={styles.label}>{`${label}>`}</span>}
            <select
                disabled={readonly}
                className={styles.select}
                value={value}
                onChange={onChangeHandler}
            >
                {optionsList}
            </select>
        </div>
    );
};

import { Dispatch, SetStateAction, useCallback, useState } from "react";

interface ReturnType {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
    on: () => void;
    off: () => void;
    toggle: () => void;
}

export const useBoolean = (defaultValue?: boolean): ReturnType => {
    const [value, setValue] = useState(!!defaultValue);

    const on = useCallback(() => setValue(true), []);
    const off = useCallback(() => setValue(false), []);
    const toggle = useCallback(() => setValue((prev) => !prev), []);

    return { value, setValue, on, off, toggle };
};

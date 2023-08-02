import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "shared/ui/Select/Select";

import { classNames } from "shared/lib/classNames/classNames";
import { ListBox } from "shared/ui/ListBox/ListBox";
import { Country } from "../../model/consts/countryConsts";

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.US, content: Country.US },
    { value: Country.GERMANY, content: Country.GERMANY },
    { value: Country.RUSSIA, content: Country.RUSSIA },
    { value: Country.GEORGIA, content: Country.GEORGIA },
    { value: Country.BELARUS, content: Country.BELARUS },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
    const { className, value, onChange, readonly } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country);
        },
        [onChange]
    );

    return (
        <ListBox
            className={className}
            value={value}
            onChange={onChangeHandler}
            defaultValue={t("Country", { ns: "translation" })}
            items={options}
            readonly={readonly}
            label={t("Country", { ns: "translation" })}
            direction="top-right"
        />
    );

    /*   return (
        <Select
            label={t("Country", { ns: "translation" })}
            options={options}
            className={classNames("", {}, [className])}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    ); */
});

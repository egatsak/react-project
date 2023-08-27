import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ListBox as ListboxDeprecated } from "@/shared/ui/deprecated/Popups/ui/ListBox/ListBox";
import { Country } from "../../model/consts/countryConsts";
import { ToggleFeatures } from "@/shared/lib/features";
import { ListBox } from "@/shared/ui/redesigned/Popups";

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
        [onChange],
    );

    const listBoxProps = {
        className,
        value,
        onChange: onChangeHandler,
        defaultValue: t("Country", { ns: "translation" }),
        items: options,
        readonly,
        label: t("Country", { ns: "translation" }),
        direction: "top-right" as const,
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<ListBox {...listBoxProps} />}
            off={<ListboxDeprecated {...listBoxProps} />}
        />
    );
});

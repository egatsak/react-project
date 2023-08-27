import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { ListBox as ListboxDeprecated } from "@/shared/ui/deprecated/Popups/ui/ListBox/ListBox";
import { Currency } from "../../model/types/currency";
import { ToggleFeatures } from "@/shared/lib/features";
import { ListBox } from "@/shared/ui/redesigned/Popups";

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { value: Currency.USD, content: Currency.USD },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.GEL, content: Currency.GEL },
    { value: Currency.BYN, content: Currency.BYN },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const { className, value, onChange, readonly } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency);
        },
        [onChange],
    );

    const listboxProps = {
        className,
        value,
        onChange: onChangeHandler,
        defaultValue: t("Currency", { ns: "translation" }),
        items: options,
        readonly,
        label: t("Currency", { ns: "translation" }),
        direction: "top-right" as const,
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<ListBox {...listboxProps} />}
            off={<ListboxDeprecated {...listboxProps} />}
        />
    );
});

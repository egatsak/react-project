import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Select, SelectOption } from "shared/ui/Select/Select";
import { SortOrder } from "shared/types";
import { ArticleSortField } from "../../model/types/article";

import styles from "./ArticleSortSelector.module.scss";

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const { className, sort, order, onChangeOrder, onChangeSort } = props;
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            { value: "asc", content: t("asc", { ns: "translation" }) },
            { value: "desc", content: t("desc", { ns: "translation" }) },
        ],
        [t]
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
        () => [
            {
                value: ArticleSortField.CREATEDAT,
                content: t("Created at", { ns: "translation" }),
            },
            {
                value: ArticleSortField.TITLE,
                content: t("Title", { ns: "translation" }),
            },
            {
                value: ArticleSortField.VIEWS,
                content: t("Views", { ns: "translation" }),
            },
        ],
        [t]
    );

    return (
        <div
            className={classNames(styles.articleSortSelector, {}, [className])}
        >
            <Select<ArticleSortField>
                options={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
                label={t("Sort by", { ns: "translation" })}
            />
            <Select<SortOrder>
                className={styles.order}
                options={orderOptions}
                value={order}
                label={t("by", { ns: "translation" })}
                onChange={onChangeOrder}
            />
        </div>
    );
});

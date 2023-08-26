import { memo } from "react";
import { useTranslation } from "react-i18next";

import { ArticleSortField, ArticleType } from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { ArticleSortSelector } from "@/features/ArticleSortSelector";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";
import { SortOrder } from "@/shared/types/sort";
import styles from "./ArticlesFilters.module.scss";
import { Input } from "@/shared/ui/redesigned/Input/Input";

interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    type: ArticleType;
    search: string;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSearch: (search: string) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeType: (newType: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
    const {
        className,
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeType,
        order,
        search,
        sort,
        type,
    } = props;
    const { t } = useTranslation();

    return (
        <Card
            padding="24"
            className={classNames(styles.articlesFilters, {}, [className])}
        >
            <Input
                inputId="search"
                onChange={onChangeSearch}
                value={search}
                placeholder={t("Search", { ns: "translation" })}
            />
            <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
                className={styles.tabs}
            />
            <ArticleSortSelector
                sort={sort}
                order={order}
                onChangeOrder={onChangeOrder}
                onChangeSort={onChangeSort}
            />
        </Card>
    );
});

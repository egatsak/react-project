import { memo } from "react";
import { useTranslation } from "react-i18next";

import { ArticleSortSelector } from "@/features/ArticleSortSelector";
import { ArticleViewSelector } from "@/features/ArticleViewSelector";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";

import { Card } from "@/shared/ui/deprecated/Card/Card";
import { Input } from "@/shared/ui/deprecated/Input/Input";
import { classNames } from "@/shared/lib/classNames/classNames";

import { useArticleFilters } from "../../lib/hooks/useArticleFilters";
import styles from "./ArticlePageFilters.module.scss";

interface ArticlePageFiltersProps {
    className?: string;
}

export const ArticlePageFilters = memo((props: ArticlePageFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
        sort,
        type,
        search,
        view,
        order,
        onChangeSort,
        onChangeType,
        onChangeSearch,
        onChangeView,
        onChangeOrder,
    } = useArticleFilters();

    return (
        <div className={classNames(styles.articlePageFilters, {}, [className])}>
            <div className={styles.sortWrapper}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card className={styles.search}>
                <Input
                    inputId="search"
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t("Search", { ns: "translation" })}
                />
            </Card>
            <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
                className={styles.tabs}
            />
        </div>
    );
});

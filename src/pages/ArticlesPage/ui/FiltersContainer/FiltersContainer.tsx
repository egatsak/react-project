import { memo } from "react";
import { ArticlesFilters } from "@/widgets/ArticlesFilters";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;
    const {
        sort,
        search,
        order,
        type,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeType,
    } = useArticleFilters();

    return (
        <ArticlesFilters
            sort={sort}
            search={search}
            order={order}
            type={type}
            onChangeSort={onChangeSort}
            onChangeSearch={onChangeSearch}
            onChangeType={onChangeType}
            onChangeOrder={onChangeOrder}
            className={className}
        />
    );
});

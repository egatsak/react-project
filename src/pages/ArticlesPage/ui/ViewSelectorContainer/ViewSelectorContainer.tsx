import { memo } from "react";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ArticleViewSelector } from "@/features/ArticleViewSelector";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo(
    (props: ViewSelectorContainerProps) => {
        const { className } = props;
        const dispatch = useAppDispatch();
        const { view, onChangeView } = useArticleFilters();

        return (
            <ArticleViewSelector
                className={className}
                view={view}
                onViewClick={onChangeView}
            />
        );
    },
);

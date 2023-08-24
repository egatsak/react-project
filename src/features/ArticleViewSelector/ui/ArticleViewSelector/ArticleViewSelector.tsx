import { memo } from "react";

import { ArticleView } from "@/entities/Article";
import ListIcon from "@/shared/assets/icons/icon-article-list.svg";
import GridIcon from "@/shared/assets/icons/icon-article-grid.svg";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Icon } from "@/shared/ui/deprecated/Icon/Icon";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button/Button";

import styles from "./ArticleViewSelector.module.scss";

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.LIST,
        icon: ListIcon,
    },
    {
        view: ArticleView.GRID,
        icon: GridIcon,
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <div
            className={classNames(styles.articleViewSelector, {}, [className])}
        >
            {viewTypes.map((viewType) => (
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(viewType.view)}
                    key={viewType.view}
                >
                    <Icon
                        width={24}
                        height={24}
                        className={classNames("", {
                            [styles.selected]: viewType.view === view,
                        })}
                        Svg={viewType.icon}
                    />
                </Button>
            ))}
        </div>
    );
});

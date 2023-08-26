import { memo } from "react";

import { ArticleView } from "@/entities/Article";
import GridIconDeprecated from "@/shared/assets/icons/icon-article-grid.svg";
import ListIconDeprecated from "@/shared/assets/icons/icon-article-list.svg";

import ListIcon from "@/shared/assets/icons/icon-burger-redesigned.svg";
import GridIcon from "@/shared/assets/icons/icon-tile-redesigned.svg";

import { classNames } from "@/shared/lib/classNames/classNames";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon/Icon";
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";

import styles from "./ArticleViewSelector.module.scss";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { getStack } from "@/shared/lib/getStack/getStack";

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.LIST,
        icon: toggleFeatures({
            name: "isAppRedesigned",
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
    {
        view: ArticleView.GRID,
        icon: toggleFeatures({
            name: "isAppRedesigned",
            on: () => GridIcon,
            off: () => GridIconDeprecated,
        }),
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    className={classNames(
                        styles.articleViewSelectorRedesigned,
                        {},
                        [className],
                    )}
                    border="round"
                    style={getStack({ gap: "16", direction: "row" })}
                >
                    {viewTypes.map((viewType) => (
                        <Icon
                            key={viewType.view}
                            clickable
                            onClick={onClick(viewType.view)}
                            width={24}
                            height={24}
                            className={classNames("", {
                                [styles.notSelected]: viewType.view !== view,
                            })}
                            Svg={viewType.icon}
                        />
                    ))}
                </Card>
            }
            off={
                <div
                    className={classNames(styles.articleViewSelector, {}, [
                        className,
                    ])}
                >
                    {viewTypes.map((viewType) => (
                        <ButtonDeprecated
                            theme={ButtonTheme.CLEAR}
                            onClick={onClick(viewType.view)}
                            key={viewType.view}
                        >
                            <IconDeprecated
                                width={24}
                                height={24}
                                className={classNames("", {
                                    [styles.selected]: viewType.view === view,
                                })}
                                Svg={viewType.icon}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            }
        />
    );
});

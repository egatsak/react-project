import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ArticleType } from "@/entities/Article";
import {
    TabItem,
    Tabs as TabsDeprecated,
} from "@/shared/ui/deprecated/Tabs/Tabs";
import { ToggleFeatures } from "@/shared/lib/features";
import { Tabs } from "@/shared/ui/redesigned/Tabs/Tabs";

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation();

    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: ArticleType.ALL,
                content: t("All articles", { ns: "article" }),
            },
            {
                value: ArticleType.ECONOMICS,
                content: t("Economics", { ns: "article" }),
            },
            {
                value: ArticleType.SCIENCE,
                content: t("Science", { ns: "article" }),
            },
            { value: ArticleType.IT, content: t("IT", { ns: "article" }) },
        ],
        [t],
    );

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as ArticleType);
        },
        [onChangeType],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Tabs
                    align="start"
                    direction="column"
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={className}
                />
            }
            off={
                <TabsDeprecated
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={className}
                />
            }
        />
    );
});

import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ArticleType } from "@/entities/Article";
import { TabItem, Tabs } from "@/shared/ui/Tabs/Tabs";

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
        [t]
    );

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as ArticleType);
        },
        [onChangeType]
    );

    return (
        <Tabs
            tabs={typeTabs}
            value={value}
            onTabClick={onTabClick}
            className={className}
        />
    );
});

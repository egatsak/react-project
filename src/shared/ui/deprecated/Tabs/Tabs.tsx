import { ReactNode, memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card, CardTheme } from "../Card/Card";
import styles from "./Tabs.module.scss";

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
}

/**
 * @deprecated
 * Please use redesigned UI components instead
 */
export const Tabs = memo((props: TabsProps) => {
    const { className, tabs, value, onTabClick } = props;

    const clickHandler = useCallback(
        (tab: TabItem) => {
            return () => {
                onTabClick(tab);
            };
        },
        [onTabClick],
    );

    return (
        <div className={classNames(styles.tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    key={tab.value}
                    className={styles.tab}
                    theme={
                        tab.value === value
                            ? CardTheme.NORMAL
                            : CardTheme.OUTLINED
                    }
                    onClick={clickHandler(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});

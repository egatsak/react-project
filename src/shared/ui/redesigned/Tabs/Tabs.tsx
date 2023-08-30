import { ReactNode, memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card } from "../Card/Card";
import { Flex, FlexAlign, FlexDirection } from "../Stack/Flex/Flex";
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
    direction?: FlexDirection;
    align?: FlexAlign;
}

export const Tabs = memo((props: TabsProps) => {
    const {
        className,
        tabs,
        value,
        onTabClick,
        direction = "row",
        align = "center",
        ...otherProps
    } = props;

    const clickHandler = useCallback(
        (tab: TabItem) => {
            return () => {
                onTabClick(tab);
            };
        },
        [onTabClick],
    );

    return (
        <Flex
            direction={direction}
            gap="8"
            align={align}
            className={classNames(styles.tabs, {}, [className])}
            {...otherProps}
        >
            {tabs.map((tab) => {
                const isSelected = tab.value === value;

                return (
                    <Card
                        key={tab.value}
                        className={classNames(styles.tab, {
                            [styles.tabSelected]: isSelected,
                        })}
                        variant={isSelected ? "light" : "normal"}
                        onClick={clickHandler(tab)}
                        border="round"
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </Flex>
    );
});

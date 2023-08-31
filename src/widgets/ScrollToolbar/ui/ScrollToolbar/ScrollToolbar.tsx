import { memo } from "react";
import { ScrollToTopButton } from "@/features/ScrollToTopButton";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { classNames } from "@/shared/lib/classNames/classNames";
import styles from "./ScrollToolbar.module.scss";

interface ScrollToolbarProps {
    className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
    const { className } = props;

    return (
        <VStack
            max
            align="center"
            justify="center"
            className={classNames(styles.scrollToolbar, {}, [className])}
        >
            <ScrollToTopButton />
        </VStack>
    );
});

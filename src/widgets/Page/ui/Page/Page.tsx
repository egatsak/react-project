import { MutableRefObject, ReactNode, useRef, UIEvent } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { StateSchema } from "@/app/providers/StoreProvider";
import { getUIScrollByPath, uiActions } from "@/features/UI";

import { classNames } from "@/shared/lib/classNames/classNames";
import { useInfiniteScroll } from "@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useThrottle } from "@/shared/lib/hooks/useThrottle/useThrottle";
import { TestProps } from "@/shared/types/tests";

import styles from "./Page.module.scss";
import { toggleFeatures } from "@/shared/lib/features";

interface PageProps extends TestProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = (props: PageProps) => {
    const {
        className,
        children,
        onScrollEnd,
        "data-testid": dataTestId = "Page",
    } = props;

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) =>
        getUIScrollByPath(state, pathname),
    );

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const scrollHandler = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            uiActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            }),
        );
    }, 500);

    const style = toggleFeatures({
        name: "isAppRedesigned",
        on: () => styles.pageRedesigned,
        off: () => styles.page,
    });

    return (
        <main
            ref={wrapperRef}
            className={classNames(style, {}, [className])}
            onScroll={scrollHandler}
            data-testid={dataTestId}
        >
            {children}
            {onScrollEnd && <div className={styles.trigger} ref={triggerRef} />}
        </main>
    );
};

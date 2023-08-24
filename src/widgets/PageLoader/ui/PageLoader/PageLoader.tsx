import { FC } from "react";
import { Loader } from "@/shared/ui/deprecated/Loader/Loader";
import { classNames } from "@/shared/lib/classNames/classNames";
import styles from "./PageLoader.module.scss";

interface PageLoaderProps {
    className?: string;
}

export const PageLoader: FC<PageLoaderProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.pageLoader, {}, [className])}>
            <Loader />
        </div>
    );
};

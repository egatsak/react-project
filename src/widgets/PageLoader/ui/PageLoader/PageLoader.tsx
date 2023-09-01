import { FC } from "react";
import { Loader as LoaderDeprecated } from "@/shared/ui/deprecated/Loader/Loader";
import { classNames } from "@/shared/lib/classNames/classNames";
import styles from "./PageLoader.module.scss";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { Loader } from "@/shared/ui/redesigned/Loader/Loader";

interface PageLoaderProps {
    className?: string;
}

export const PageLoader: FC<PageLoaderProps> = (props) => {
    const { className } = props;

    const mainClass = toggleFeatures({
        name: "isAppRedesigned",
        on: () => styles.pageLoaderRedesigned,
        off: () => styles.pageLoader,
    });

    return (
        <div className={classNames(mainClass, {}, [className])}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Loader />}
                off={<LoaderDeprecated />}
            />
        </div>
    );
};

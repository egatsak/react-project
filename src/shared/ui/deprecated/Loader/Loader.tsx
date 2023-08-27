import { FC } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import "./Loader.scss";

interface LoaderProps {
    className?: string;
}

/**
 * @deprecated
 * Please use redesigned UI components instead
 */
export const Loader: FC<LoaderProps> = ({ className }) => {
    return (
        <div className={classNames("lds-ring", {}, [className])}>
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};
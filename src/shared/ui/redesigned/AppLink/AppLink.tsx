import { memo, ReactNode } from "react";
import { LinkProps, NavLink } from "react-router-dom";
import { classNames } from "@/shared/lib/classNames/classNames";
import styles from "./AppLink.module.scss";

export type AppLinkVariant = "primary" | "red";

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children?: ReactNode;
    activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to,
        className,
        children,
        activeClassName = "",
        variant = "primary",
        ...otherProps
    } = props;

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(styles.appLink, { [activeClassName]: isActive }, [
                    className,
                    styles[variant],
                ])
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});

import { ReactElement, memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import styles from "./MainLayout.module.scss";

interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
    toolbar?: ReactElement;
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const { className, header, content, sidebar, toolbar } = props;

    return (
        <div className={classNames(styles.mainLayout, {}, [className])}>
            <div className={styles.sidebar}>{sidebar}</div>
            <div className={styles.content}>{content}</div>
            <div className={styles.rightbar}>
                <div className={styles.header}>{header}</div>
                <div className={styles.toolbar}>{toolbar}</div>
            </div>
        </div>
    );
});

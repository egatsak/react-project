import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./PageError.module.scss";

interface PageErrorProps {
    className?: string;
}

export const PageError: FC<PageErrorProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();

    const reloadPage = () => {
        window.location.reload();
    };
    return (
        <div className={classNames(styles.pageError, {}, [className])}>
            <p>
                {t("ErrorBoundary has caught an Unexpected Error", {
                    ns: "translation",
                })}
            </p>
            <Button onClick={reloadPage}>
                {t("Reload page", {
                    ns: "translation",
                })}
            </Button>
        </div>
    );
};

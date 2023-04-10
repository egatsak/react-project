import { FC, memo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArticleDetails } from "entities/Article";
import { classNames } from "shared/lib/classNames/classNames";

import styles from "./ArticleDetailsPage.module.scss";

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation("article");
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return (
            <div
                className={classNames(styles.articleDetailsPage, {}, [
                    className,
                ])}
            >
                {t("Article not found", { ns: "article" })}
            </div>
        );
    }
    return (
        <div className={classNames(styles.articleDetailsPage, {}, [className])}>
            <ArticleDetails id={id} />
        </div>
    );
};

export default memo(ArticleDetailsPage);

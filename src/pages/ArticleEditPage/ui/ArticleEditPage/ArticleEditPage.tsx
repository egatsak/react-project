import { memo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Page } from "@/widgets/Page/Page";

import styles from "./ArticleEditPage.module.scss";

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);

    return (
        <Page className={classNames(styles.articleEditPage, {}, [className])}>
            {isEdit
                ? t("Edit article ID = ", { ns: "article" }) + id
                : t("New article", { ns: "article" })}
        </Page>
    );
});

export default ArticleEditPage;

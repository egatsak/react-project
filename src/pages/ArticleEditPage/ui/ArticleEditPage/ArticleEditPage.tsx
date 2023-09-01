import { memo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Page } from "@/widgets/Page";
import { ToggleFeatures } from "@/shared/lib/features";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text/Text";

const ArticleEditPage = memo(() => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);

    const text = isEdit
        ? t("Edit article ID = ", { ns: "article" }) + id
        : t("New article", { ns: "article" });

    return (
        <Page data-testid="ArticleEditPage">
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Text title={text} />}
                off={<TextDeprecated title={text} />}
            />
        </Page>
    );
});

export default ArticleEditPage;

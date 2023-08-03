import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page/Page";

const ForbiddenPage: FC = () => {
    const { t } = useTranslation();
    return (
        <Page>
            {t("You don't have access to this page!", { ns: "translation" })}
        </Page>
    );
};

export default ForbiddenPage;
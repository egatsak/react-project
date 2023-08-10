import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";

const AdminPanelPage: FC = () => {
    const { t } = useTranslation("admin");
    return <Page>{t("Admin panel page", { ns: "admin" })}</Page>;
};

export default AdminPanelPage;

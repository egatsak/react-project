import { FC } from "react";
import { useTranslation } from "react-i18next";

const MainPage: FC = () => {
    const { t } = useTranslation("main");
    return <div>{t("Main page", { ns: "main" })}</div>;
};

export default MainPage;

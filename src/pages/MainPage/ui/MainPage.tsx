import { useTranslation } from "react-i18next";

const MainPage = () => {
    const { t } = useTranslation("main");
    return <div>{t("Main page", { ns: "main" })}</div>;
};

export default MainPage;

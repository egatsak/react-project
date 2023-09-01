import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text/Text";
import { ToggleFeatures } from "@/shared/lib/features";

const MainPage: FC = () => {
    const { t } = useTranslation("main");

    return (
        <Page data-testid="MainPage">
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Text title={t("Main page", { ns: "main" })} />}
                off={<TextDeprecated title={t("Main page", { ns: "main" })} />}
            />
        </Page>
    );
};

export default MainPage;

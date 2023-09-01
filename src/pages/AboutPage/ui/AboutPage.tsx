import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text/Text";
import { ToggleFeatures } from "@/shared/lib/features";

const AboutPage: FC = () => {
    const { t } = useTranslation("about");
    return (
        <Page data-testid="AboutPage">
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Text title={t("About page", { ns: "about" })} />}
                off={
                    <TextDeprecated title={t("About page", { ns: "about" })} />
                }
            />
        </Page>
    );
};

export default AboutPage;

import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text/Text";
import { ToggleFeatures } from "@/shared/lib/features";

const AdminPanelPage: FC = () => {
    const { t } = useTranslation("admin");
    return (
        <Page data-testid="AdminPanelPage">
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Text title={t("Admin panel page", { ns: "admin" })} />}
                off={
                    <TextDeprecated
                        title={t("Admin panel page", { ns: "admin" })}
                    />
                }
            />
        </Page>
    );
};

export default AdminPanelPage;

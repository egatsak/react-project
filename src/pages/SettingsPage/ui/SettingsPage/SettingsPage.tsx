import { memo } from "react";
import { useTranslation } from "react-i18next";

import { Page } from "@/widgets/Page";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text/Text";

import { UiDesignSwitcher } from "@/features/UiDesignSwitcher";
import { ToggleFeatures } from "@/shared/lib/features";

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
    const { className } = props;
    const { t } = useTranslation("settings");

    return (
        <Page className={className}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <VStack gap="16">
                        <Text title={t("Settings", { ns: "settings" })} />
                        <UiDesignSwitcher />
                    </VStack>
                }
                off={
                    <VStack gap="16">
                        <TextDeprecated
                            title={t("Settings", { ns: "settings" })}
                        />
                        <UiDesignSwitcher />
                    </VStack>
                }
            />
        </Page>
    );
});

export default SettingsPage;

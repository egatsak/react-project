import { memo } from "react";
import { useTranslation } from "react-i18next";
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { ToggleFeatures } from "@/shared/lib/features";
import { Button } from "@/shared/ui/redesigned/Button/Button";

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = memo((props: LangSwitcherProps) => {
    const { className, short } = props;
    const { t, i18n } = useTranslation();

    const toggle = () => {
        i18n.changeLanguage(i18n.language === "en" ? "ru" : "en");
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Button className={className} variant="clear" onClick={toggle}>
                    {short
                        ? t("ShortLang", { ns: "translation" })
                        : t("Language", { ns: "translation" })}
                </Button>
            }
            off={
                <ButtonDeprecated
                    className={className}
                    theme={ButtonTheme.CLEAR}
                    onClick={toggle}
                >
                    {short
                        ? t("ShortLang", { ns: "translation" })
                        : t("Language", { ns: "translation" })}
                </ButtonDeprecated>
            }
        />
    );
});

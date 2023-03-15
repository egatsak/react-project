import { memo } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";

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
        <Button
            className={classNames("", {}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={toggle}
        >
            {short
                ? t("ShortLang", { ns: "translation" })
                : t("Language", { ns: "translation" })}
        </Button>
    );
});

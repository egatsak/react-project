import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "shared/ui/Button/Button";

// component for testing ErrorBoundary

export const BugButton: FC = () => {
    const [err, setErr] = useState(false);

    const { t } = useTranslation();
    const onError = () => {
        return setErr(true);
    };

    useEffect(() => {
        if (err) {
            throw new Error();
        }
    }, [err]);

    return (
        <Button onClick={onError}>
            {t("throw error", { ns: "translation" })}
        </Button>
    );
};

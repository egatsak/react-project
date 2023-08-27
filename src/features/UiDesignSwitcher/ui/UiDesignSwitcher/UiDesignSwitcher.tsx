import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { ListBox } from "@/shared/ui/redesigned/Popups";
import { getFeatureFlag, updateFeatureFlags } from "@/shared/lib/features";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData } from "@/entities/User";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton/Skeleton";

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const isAppRedesigned = getFeatureFlag("isAppRedesigned");
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    // TODO: add togglefeature for skeleton & listbox
    const items = useMemo(
        () => [
            {
                content: t("New design", { ns: "translation" }),
                value: "new",
            },
            {
                content: t("Old design", { ns: "translation" }),
                value: "old",
            },
        ],
        [t],
    );

    const onChange = async (value: string) => {
        if (authData) {
            setIsLoading(true);
            await dispatch(
                updateFeatureFlags({
                    newFeatures: { isAppRedesigned: value === "new" },
                    userId: authData?.id,
                }),
            ).unwrap();
            setIsLoading(false);
        }
    };

    return (
        <VStack gap="16">
            <Text text={t("UI Design", { ns: "translation" })} />
            {isLoading ? (
                <Skeleton width={100} height={38} />
            ) : (
                <ListBox
                    onChange={onChange}
                    items={items}
                    value={isAppRedesigned ? "new" : "old"}
                    className={className}
                />
            )}
        </VStack>
    );
});

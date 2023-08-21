import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";

import { saveJsonSettings, useJsonSettings } from "@/entities/User";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Text } from "@/shared/ui/Text/Text";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Drawer } from "@/shared/ui/Drawer/Drawer";

export const ArticlePageGreeting = memo(() => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { hasArticlesPageBeenVisited } = useJsonSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!hasArticlesPageBeenVisited) {
            setIsModalOpen(true);
            dispatch(saveJsonSettings({ hasArticlesPageBeenVisited: true }));
        }
    }, [dispatch, hasArticlesPageBeenVisited]);

    const onClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const text = (
        <Text
            title={t("Welcome to articles page!", { ns: "article" })}
            text={t("Here you can find articles on different topics.", {
                ns: "article",
            })}
        />
    );

    if (isMobile) {
        return (
            <Drawer lazy isOpen={isModalOpen} onClose={onClose}>
                {text}
            </Drawer>
        );
    }

    return (
        <Modal lazy isOpen={isModalOpen} onClose={onClose}>
            {text}
        </Modal>
    );
});

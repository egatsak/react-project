import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserView, MobileView } from "react-device-detect";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Card } from "@/shared/ui/deprecated/Card/Card";
import { Text } from "@/shared/ui/deprecated/Text/Text";
import { StarRating } from "@/shared/ui/deprecated/StarRating/StarRating";
import {
    Button,
    ButtonSize,
    ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { Drawer } from "@/shared/ui/deprecated/Drawer/Drawer";
import { Modal } from "@/shared/ui/deprecated/Modal/Modal";
import { Input } from "@/shared/ui/deprecated/Input/Input";

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        onAccept,
        onCancel,
        title,
        feedbackTitle,
        hasFeedback,
        rate = 0,
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState("");

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

    const acceptHandler = useCallback(() => {
        onAccept?.(starsCount, feedback);
        setModalOpen(false);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
        onCancel?.(starsCount);
        setModalOpen(false);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <Text title={feedbackTitle} />
            <Input
                inputId="rating-feedback"
                value={feedback}
                onChange={setFeedback}
                data-testid="RatingCard.Input"
                placeholder={t("Your review", {
                    ns: "translation",
                })}
            />
        </>
    );

    return (
        <Card className={className} max data-testid="RatingCard">
            <VStack align="center" gap="8" max>
                <Text
                    title={
                        starsCount
                            ? t("Thanks for your review!", {
                                  ns: "translation",
                              })
                            : title
                    }
                />
                <StarRating
                    size={40}
                    onSelect={onSelectStars}
                    selectedStars={starsCount}
                />
                <BrowserView>
                    <Modal isOpen={isModalOpen} lazy>
                        <VStack gap="32" max>
                            {modalContent}
                        </VStack>
                        <HStack gap="16" max justify="end">
                            <Button
                                data-testid="RatingCard.Close"
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={cancelHandler}
                            >
                                {t("Close", { ns: "translation" })}
                            </Button>
                            <Button
                                data-testid="RatingCard.Send"
                                onClick={acceptHandler}
                            >
                                {t("Send", { ns: "translation" })}
                            </Button>
                        </HStack>
                    </Modal>
                </BrowserView>
                <MobileView>
                    <Drawer isOpen={isModalOpen}>
                        <VStack gap="32">
                            {modalContent}
                            <Button
                                fullWidth
                                onClick={acceptHandler}
                                size={ButtonSize.L}
                            >
                                {t("Send", { ns: "translation" })}
                            </Button>
                        </VStack>
                    </Drawer>
                </MobileView>
            </VStack>
        </Card>
    );
});

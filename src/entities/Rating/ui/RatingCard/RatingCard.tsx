import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserView, MobileView } from "react-device-detect";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Card as CardDeprecated } from "@/shared/ui/deprecated/Card/Card";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text/Text";
import { StarRating } from "@/shared/ui/deprecated/StarRating/StarRating";
import {
    Button as ButtonDeprecated,
    ButtonSize,
    ButtonTheme,
} from "@/shared/ui/deprecated/Button/Button";
import { Drawer } from "@/shared/ui/redesigned/Drawer/Drawer";
import { Modal } from "@/shared/ui/redesigned/Modal/Modal";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input/Input";
import { ToggleFeatures } from "@/shared/lib/features";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { Card } from "@/shared/ui/redesigned/Card/Card";

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <>
                    <Text title={feedbackTitle} />
                    <Input
                        value={feedback}
                        onChange={setFeedback}
                        data-testid="RatingCard.Input"
                        placeholder={t("Your review", {
                            ns: "translation",
                        })}
                    />
                </>
            }
            off={
                <>
                    <TextDeprecated title={feedbackTitle} />
                    <InputDeprecated
                        inputId="rating-feedback"
                        value={feedback}
                        onChange={setFeedback}
                        data-testid="RatingCard.Input"
                        placeholder={t("Your review", {
                            ns: "translation",
                        })}
                    />
                </>
            }
        />
    );

    const content = (
        <VStack align="center" gap="8" max>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Text
                        title={
                            starsCount
                                ? t("Thanks for your review!", {
                                      ns: "translation",
                                  })
                                : title
                        }
                    />
                }
                off={
                    <TextDeprecated
                        title={
                            starsCount
                                ? t("Thanks for your review!", {
                                      ns: "translation",
                                  })
                                : title
                        }
                    />
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
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <HStack gap="16" max justify="end">
                                    <Button
                                        data-testid="RatingCard.Close"
                                        variant="filled"
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
                            }
                            off={
                                <HStack gap="16" max justify="end">
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Close"
                                        theme={ButtonTheme.OUTLINE_RED}
                                        onClick={cancelHandler}
                                    >
                                        {t("Close", { ns: "translation" })}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Send"
                                        onClick={acceptHandler}
                                    >
                                        {t("Send", { ns: "translation" })}
                                    </ButtonDeprecated>
                                </HStack>
                            }
                        />
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen}>
                    <VStack gap="32">
                        {modalContent}
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <Button
                                    fullWidth
                                    onClick={acceptHandler}
                                    size="l"
                                >
                                    {t("Send", { ns: "translation" })}
                                </Button>
                            }
                            off={
                                <ButtonDeprecated
                                    fullWidth
                                    onClick={acceptHandler}
                                    size={ButtonSize.L}
                                >
                                    {t("Send", { ns: "translation" })}
                                </ButtonDeprecated>
                            }
                        />
                    </VStack>
                </Drawer>
            </MobileView>
        </VStack>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    border="round"
                    className={className}
                    max
                    data-testid="RatingCard"
                >
                    {content}
                </Card>
            }
            off={
                <CardDeprecated
                    className={className}
                    max
                    data-testid="RatingCard"
                >
                    {content}
                </CardDeprecated>
            }
        />
    );
});

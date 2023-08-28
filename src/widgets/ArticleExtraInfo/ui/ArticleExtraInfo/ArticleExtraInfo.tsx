import { memo } from "react";
import { useTranslation } from "react-i18next";
import { User } from "@/entities/User";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Button } from "@/shared/ui/redesigned/Button/Button";

interface ArticleExtraInfoProps {
    className?: string;
    author: User;
    createdAt: string;
    views: number;
    onEdit: () => void;
}

export const ArticleExtraInfo = memo((props: ArticleExtraInfoProps) => {
    const { className, author, createdAt, views, onEdit } = props;
    const { t } = useTranslation();

    return (
        <VStack gap="32" className={className}>
            <HStack gap="8">
                <Avatar size={32} src={author.avatar} alt={author.username} />
                <Text text={author.username} bold />
                <Text text={createdAt} bold />
            </HStack>
            <Button variant="outline" onClick={onEdit}>
                {t("Edit", { ns: "translation" })}
            </Button>
            <Text
                text={t("{{count}} views", { ns: "article", count: views })}
                bold
            />
        </VStack>
    );
});

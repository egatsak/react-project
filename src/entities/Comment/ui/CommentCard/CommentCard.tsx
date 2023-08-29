import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Avatar as AvatarDeprecated } from "@/shared/ui/deprecated/Avatar/Avatar";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text/Text";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton/Skeleton";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { AppLink as AppLinkDeprecated } from "@/shared/ui/deprecated/AppLink/AppLink";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Comment } from "../../model/types/comment";

import styles from "./CommentCard.module.scss";
import { getRouteProfile } from "@/shared/const/router";
import { ToggleFeatures, toggleFeatures } from "@/shared/lib/features";
import { AppLink } from "@/shared/ui/redesigned/AppLink/AppLink";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Card } from "@/shared/ui/redesigned/Card/Card";

interface CommentCardProps {
    comment?: Comment;
    className?: string;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    const Skeleton = toggleFeatures({
        name: "isAppRedesigned",
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    if (isLoading) {
        return (
            <VStack
                data-testid="CommentCard.Loading"
                gap="8"
                max
                className={classNames(styles.commentCard, {}, [
                    className,
                    styles.loading,
                ])}
            >
                <div className={styles.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton
                        width={100}
                        height={16}
                        className={styles.username}
                    />
                </div>
                <Skeleton width="100%" height={50} className={styles.text} />
            </VStack>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card padding="24" border="round" max>
                    <VStack
                        data-testid="CommentCard.Content"
                        max
                        gap="8"
                        className={classNames(
                            styles.commentCardRedesigned,
                            {},
                            [className],
                        )}
                    >
                        <AppLink
                            to={getRouteProfile(comment.user.id)}
                            className={styles.header}
                        >
                            <HStack gap="8">
                                {comment.user.avatar && (
                                    <Avatar
                                        size={30}
                                        src={comment.user.avatar}
                                    />
                                )}
                                <Text text={comment.user.username} bold />
                            </HStack>
                        </AppLink>
                        <Text text={comment.text} />
                    </VStack>
                </Card>
            }
            off={
                <VStack
                    data-testid="CommentCard.Content"
                    max
                    gap="8"
                    className={classNames(styles.commentCard, {}, [className])}
                >
                    <AppLinkDeprecated
                        to={getRouteProfile(comment.user.id)}
                        className={styles.header}
                    >
                        {comment.user.avatar && (
                            <AvatarDeprecated
                                size={30}
                                src={comment.user.avatar}
                            />
                        )}
                        <TextDeprecated
                            title={comment.user.username}
                            className={styles.username}
                        />
                    </AppLinkDeprecated>
                    <TextDeprecated text={comment.text} />
                </VStack>
            }
        />
    );
});

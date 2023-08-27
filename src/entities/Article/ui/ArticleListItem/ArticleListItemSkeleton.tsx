import { memo } from "react";

import { Card as CardDeprecated } from "@/shared/ui/deprecated/Card/Card";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton/Skeleton";
import { Card as CardRedesigned } from "@/shared/ui/redesigned/Card/Card";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ArticleView } from "../../model/consts/articleConsts";

import styles from "./ArticleListItem.module.scss";
import { toggleFeatures } from "@/shared/lib/features";

interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { className, view } = props;

        const Skeleton = toggleFeatures({
            name: "isAppRedesigned",
            on: () => SkeletonRedesigned,
            off: () => SkeletonDeprecated,
        });

        const Card = toggleFeatures({
            name: "isAppRedesigned",
            on: () => CardRedesigned,
            off: () => CardDeprecated,
        });

        if (view === ArticleView.LIST) {
            return (
                <div
                    className={classNames(styles.articleListItem, {}, [
                        className,
                        styles[view],
                    ])}
                >
                    <Card className={styles.card}>
                        <div className={styles.header}>
                            <Skeleton border="50%" width={30} height={30} />
                            <Skeleton
                                width={150}
                                height={16}
                                className={styles.username}
                            />
                            <Skeleton
                                width={150}
                                height={16}
                                className={styles.date}
                            />
                        </div>
                        <Skeleton
                            width={250}
                            height={24}
                            className={styles.title}
                        />
                        <Skeleton height={200} className={styles.img} />

                        <div className={styles.footer}>
                            <Skeleton width={200} height={36} />
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <div
                className={classNames(styles.articleListItem, {}, [
                    className,
                    styles[view],
                ])}
            >
                <Card className={styles.card}>
                    <div className={styles.imageWrapper}>
                        <Skeleton
                            width={200}
                            height={200}
                            className={styles.img}
                        />
                    </div>
                    <div className={styles.infoWrapper}>
                        <Skeleton width={130} height={16} />
                    </div>
                    <Skeleton width={150} height={16} />
                </Card>
            </div>
        );
    },
);

import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text/Text";
import { ArticleTextBlock } from "../../model/types/article";
import { ToggleFeatures } from "@/shared/lib/features";
import styles from "./ArticleTextBlockComponent.module.scss";

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
    (props: ArticleTextBlockComponentProps) => {
        const { className, block } = props;

        return (
            <div
                className={classNames(styles.articleTextBlockComponent, {}, [
                    className,
                ])}
            >
                {block.title && (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={
                            <Text
                                title={block.title}
                                className={styles.title}
                            />
                        }
                        off={
                            <TextDeprecated
                                title={block.title}
                                className={styles.title}
                            />
                        }
                    />
                )}

                {block.paragraphs.map((paragraph) => (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        key={paragraph.slice(10)}
                        on={
                            <Text
                                text={paragraph}
                                className={styles.paragraph}
                            />
                        }
                        off={
                            <TextDeprecated
                                text={paragraph}
                                className={styles.paragraph}
                            />
                        }
                    />
                ))}
            </div>
        );
    },
);

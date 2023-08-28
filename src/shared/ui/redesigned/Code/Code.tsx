import { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import CopyIcon from "@/shared/assets/icons/icon-article-copy.svg";
import CopyIconRedesigned from "@/shared/assets/icons/icon-article-copy-redesigned.svg";
import { Button, ButtonTheme } from "../../deprecated/Button/Button";

import styles from "./Code.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { Icon } from "../Icon/Icon";

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <pre
                    className={classNames(styles.codeRedesigned, {}, [
                        className,
                    ])}
                >
                    <Icon
                        clickable
                        onClick={onCopy}
                        className={styles.copyBtn}
                        Svg={CopyIconRedesigned}
                    />
                    <code>{text}</code>
                </pre>
            }
            off={
                <pre className={classNames(styles.code, {}, [className])}>
                    <Button
                        onClick={onCopy}
                        className={styles.copyBtn}
                        theme={ButtonTheme.CLEAR}
                    >
                        <CopyIcon className={styles.copyIcon} />
                    </Button>
                    <code>{text}</code>
                </pre>
            }
        />
    );
});

import React, { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import CopyIcon from "shared/assets/icons/icon-article-copy.svg";

import styles from "./Code.module.scss";

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
    );
});

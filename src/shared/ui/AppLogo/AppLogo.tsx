import { memo } from "react";
import { HStack } from "../Stack";
import { classNames } from "@/shared/lib/classNames/classNames";
import AppSvg from "@/shared/assets/icons/icon-app-image.svg";
import styles from "./AppLogo.module.scss";

interface AppLogoProps {
    className?: string;
}

export const AppLogo = memo((props: AppLogoProps) => {
    const { className } = props;

    return (
        <HStack
            max
            justify="center"
            className={classNames(styles.appLogoWrapper, {}, [className])}
        >
            <div className={styles.gradientLarge} />
            <div className={styles.gradientSmall} />
            <AppSvg className={styles.appLogo} />
        </HStack>
    );
});

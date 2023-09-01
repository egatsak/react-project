import { FC } from "react";
import { Card } from "../Card/Card";
import { HStack, VStack } from "../Stack";
import { Skeleton } from "../Skeleton/Skeleton";
import styles from "./Loader.module.scss";

export const Loader: FC = () => {
    return (
        <Card max padding="24" className={styles.loader}>
            <VStack gap="32">
                <HStack max>
                    <Skeleton width="100%" height={128} />
                </HStack>
                <HStack gap="32" max>
                    <VStack gap="16" max>
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                    </VStack>
                    <VStack gap="16" max>
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                        <Skeleton width="100%" height={38} />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};

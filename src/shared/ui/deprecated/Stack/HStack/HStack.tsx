import { Flex, FlexProps } from "../Flex/Flex";

type HStackProps = Omit<FlexProps, "direction">;

/**
 * @deprecated
 * Please use redesigned UI components instead
 */
export const HStack = (props: HStackProps) => {
    return <Flex direction="row" {...props} />;
};

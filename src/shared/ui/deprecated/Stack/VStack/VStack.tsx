import { Flex, FlexProps } from "../Flex/Flex";

type VStackProps = Omit<FlexProps, "direction">;

/**
 * @deprecated
 * Please use redesigned UI components instead
 */
export const VStack = (props: VStackProps) => {
    const { align = "start" } = props;
    return <Flex {...props} direction="column" align={align} />;
};

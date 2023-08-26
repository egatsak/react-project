import {
    FlexDirection,
    FlexGap,
    FlexJustify,
    FlexAlign,
} from "@/shared/ui/redesigned/Stack/Flex/Flex";

interface StackArgs {
    direction?: FlexDirection;
    gap?: FlexGap;
    justify?: FlexJustify;
    align?: FlexAlign;
}

export const getStack = ({
    direction = "row",
    gap = "4",
    justify = "center",
    align = "start",
}: StackArgs) => {
    return {
        display: "flex",
        flexDirection: direction,
        gap,
        justifyContent: justify,
        alignItems: align,
    };
};

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ExtraInfoContainer } from "./ExtraInfoContainer";

export default {
    title: "shared/ExtraInfoContainer",
    component: ExtraInfoContainer,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof ExtraInfoContainer>;

const Template: ComponentStory<typeof ExtraInfoContainer> = () => (
    <ExtraInfoContainer />
);

export const Normal = Template.bind({});
Normal.args = {};

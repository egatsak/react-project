import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";

export default {
    title: "shared/redesigned/Button",
    component: Button,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: "text",
};

export const Outline = Template.bind({});
Outline.args = {
    children: "text",
    variant: "outline",
};

export const SquareOutline = Template.bind({});
SquareOutline.args = {
    children: "<",
    variant: "outline",
    square: true,
};

export const Square = Template.bind({});
Square.args = {
    children: "<",
    square: true,
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
    children: "<",
    square: true,
    size: "l",
};

export const SquareSizeXL = Template.bind({});
SquareSizeXL.args = {
    children: "<",
    square: true,
    size: "xl",
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: "<",
    disabled: true,
};

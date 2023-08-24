import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";

import { Input } from "./Input";
import { Theme } from "@/shared/const/theme";

export default {
    title: "shared/Input",
    component: Input,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    placeholder: "TypeText",
    value: "123 321",
    inputId: "stories-input",
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    placeholder: "TypeText",
    value: "123 321",
    inputId: "stories-input",
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

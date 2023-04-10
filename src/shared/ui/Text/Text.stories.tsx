import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";

import { Text, TextSize, TextTheme } from "./Text";

export default {
    title: "shared/Text",
    component: Text,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: "Title lorem ipsum",
    text: "text lorem ipsum lorem ipsum",
};

export const Error = Template.bind({});
Error.args = {
    title: "Title lorem ipsum",
    text: "text lorem ipsum lorem ipsum",
    theme: TextTheme.ERROR,
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: "Title lorem ipsum",
};

export const OnlyText = Template.bind({});
OnlyText.args = {
    text: "text lorem ipsum lorem ipsum",
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: "Title lorem ipsum",
    text: "text lorem ipsum lorem ipsum",
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
    title: "Title lorem ipsum",
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
    text: "text lorem ipsum lorem ipsum",
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});
SizeL.args = {
    title: "Title lorem ipsum",
    text: "text lorem ipsum lorem ipsum",
    size: TextSize.L,
};

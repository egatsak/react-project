import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import AboutPage from "./AboutPage";
import { Theme } from "@/shared/const/theme";

export default {
    title: "pages/AboutPage",
    component: AboutPage,
    argTypes: {
        backgroundColor: { control: "color" },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = (args) => (
    <AboutPage {...args} />
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

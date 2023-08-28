import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArticleExtraInfo } from "./ArticleExtraInfo";

export default {
    title: "shared/ArticleExtraInfo",
    component: ArticleExtraInfo,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof ArticleExtraInfo>;

const Template: ComponentStory<typeof ArticleExtraInfo> = (args) => (
    <ArticleExtraInfo {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};

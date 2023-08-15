import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArticlePageFilters } from "./ArticlePageFilters";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

export default {
    title: "pages/ArticlesPage/ArticlePageFilters",
    component: ArticlePageFilters,
    argTypes: {
        backgroundColor: { control: "color" },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticlePageFilters>;

const Template: ComponentStory<typeof ArticlePageFilters> = (args) => (
    <ArticlePageFilters {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};

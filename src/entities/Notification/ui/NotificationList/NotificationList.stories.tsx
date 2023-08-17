import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NotificationList } from "./NotificationList";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

export default {
    title: "entities/Notification/NotificationList",
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: "color" },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => (
    <NotificationList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: "GET",
            status: 200,
            response: [
                {
                    id: "1",
                    title: "Title",
                    description: "Description",
                },
                {
                    id: "2",
                    title: "Title 2",
                    description: "Description 2",
                },
                {
                    id: "3",
                    title: "Title 3",
                    description: "Description 3",
                },
            ],
        },
    ],
};

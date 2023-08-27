import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import Avatar from "@/shared/assets/tests/avatar.jpg";
import { ProfileCardDeprecated } from "./ProfileCardDeprecated";

/* Не проходил скриншотный тест для ProfileCard_primary. 
Проблема была в том, что на скриншотах, которые были взяты локально со сторибука 
и со статик сторибука, отличались пути к аватару. 
Решил проблему, просто захардкодив ссылку, на внешний ресурс. */

export default {
    title: "entities/Profile/ProfileCardDeprecated",
    component: ProfileCardDeprecated,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof ProfileCardDeprecated>;

const Template: ComponentStory<typeof ProfileCardDeprecated> = (args) => (
    <ProfileCardDeprecated {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    data: {
        username: "admin",
        age: 30,
        country: Country.BELARUS,
        lastname: "Petrov",
        first: "Ivan",
        city: "Zhlobin",
        currency: Currency.BYN,
        avatar: Avatar,
    },
};
Primary.decorators = [StoreDecorator({})];

export const WithError = Template.bind({});
WithError.args = {
    error: "true",
};
WithError.decorators = [StoreDecorator({})];

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
Loading.decorators = [StoreDecorator({})];

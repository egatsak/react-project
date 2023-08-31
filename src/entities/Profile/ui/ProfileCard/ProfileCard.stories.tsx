import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import Avatar from "@/shared/assets/tests/avatar.jpg";
import { ProfileCard } from "./ProfileCard";
import { RedesignedDecorator } from "@/shared/config/storybook/RedesignedDecorator/RedesignedDecorator";
import { FeatureFlagsDecorator } from "@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator";

/* Не проходил скриншотный тест для ProfileCard_primary. 
Проблема была в том, что на скриншотах, которые были взяты локально со сторибука 
и со статик сторибука, отличались пути к аватару. 
Решил проблему, просто захардкодив ссылку, на внешний ресурс. */

export default {
    title: "entities/Profile/ProfileCard",
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
);

const primaryArgs = {
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

export const Primary = Template.bind({});
Primary.args = primaryArgs;

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = primaryArgs;
PrimaryRedesigned.decorators = [
    RedesignedDecorator,
    FeatureFlagsDecorator({ isAppRedesigned: true }),
];

export const WithError = Template.bind({});
WithError.args = {
    error: "true",
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};

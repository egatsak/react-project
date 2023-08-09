import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CurrencySelect } from "../CurrencySelect/CurrencySelect";

export default {
    title: "entities/Currency/CurrencySelect",
    component: CurrencySelect,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => (
    <CurrencySelect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

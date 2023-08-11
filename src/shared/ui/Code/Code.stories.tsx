import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Code } from "./Code";
import { Theme } from "@/shared/const/theme";

export default {
    title: "shared/Code",
    component: Code,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Light = Template.bind({});
Light.args = {
    text: `import { ComponentStory, ComponentMeta } from "@storybook/react";
    import { Code } from "./Code";
    
    export default {
        title: "shared/Code",
        component: Code,
        argTypes: {
            backgroundColor: { control: "color" },
        },
    } as ComponentMeta<typeof Code>;
    
    const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;`,
};

export const Orange = Template.bind({});
Orange.args = {
    text: `import { ComponentStory, ComponentMeta } from "@storybook/react";
    import { Code } from "./Code";
    
    export default {
        title: "shared/Code",
        component: Code,
        argTypes: {
            backgroundColor: { control: "color" },
        },
    } as ComponentMeta<typeof Code>;
    
    const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;`,
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

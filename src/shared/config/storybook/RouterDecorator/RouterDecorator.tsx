import { BrowserRouter } from "react-router-dom";
import { Story } from "@storybook/react";

export const RouterDecorator = (story: () => Story) => {
    return <BrowserRouter>{story()}</BrowserRouter>;
};

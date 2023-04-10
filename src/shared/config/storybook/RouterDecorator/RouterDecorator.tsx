import { Story, StoryContext } from "@storybook/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";

export const RouterDecorator = (
    story: () => Story,
    { parameters: { router } }: StoryContext
) => {
    if (!router) {
        return <BrowserRouter>{story()}</BrowserRouter>;
    }
    const { path, route } = router;

    return (
        <MemoryRouter initialEntries={[encodeURI(route)]}>
            <Routes>
                <Route path={path} element={story()} />
            </Routes>
        </MemoryRouter>
    );
};

import { render, screen } from "@testing-library/react";
import { Button, ThemeButton } from "./Button";

describe("BUTTON", () => {
    test("button is rendered with children TEST", () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText("TEST"));
    });
    test("button is rendered with class 'clear'", () => {
        render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
        expect(screen.getByText("TEST")).toHaveClass("clear");
    });
});

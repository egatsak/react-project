import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("BUTTON", () => {
    test("button is rendered with children TEST", () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText("TEST")).toBeInTheDocument();
    });
    test("button is rendered with class 'clear'", () => {
        render(<Button variant="clear">TEST</Button>);
        expect(screen.getByText("TEST")).toHaveClass("clear");
    });
});

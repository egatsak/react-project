import { render, screen } from "@testing-library/react";
import { Text } from "./Text";

describe("TEXT", () => {
    test("text is rendered with children TEST", () => {
        render(<Text title="TEST" />);
        expect(screen.getByText("TEST")).toBeInTheDocument();
    });
    test("text is rendered with error theme", () => {
        render(<Text variant="error" text="TEST" />);
        expect(screen.getByText("TEST").parentNode).toHaveClass("error");
    });
});

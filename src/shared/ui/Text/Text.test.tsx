import { render, screen } from "@testing-library/react";
import { Text, TextTheme } from "./Text";

describe("TEXT", () => {
    test("text is rendered with children TEST", () => {
        render(<Text title="TEST" />);
        expect(screen.getByText("TEST")).toBeInTheDocument();
    });
    test("text is rendered with error theme", () => {
        render(<Text theme={TextTheme.ERROR} text="TEST" />);
        expect(screen.getByText("TEST").parentNode).toHaveClass("error");
    });
});

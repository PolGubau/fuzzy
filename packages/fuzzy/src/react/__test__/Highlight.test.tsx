import { render } from "@testing-library/react";
import { Highlight, createHighlightComponent } from "../Highlight";
import { describe, it, expect } from "vitest";

describe("Highlight Component", () => {
	it("renders text without highlights when ranges are null", () => {
		const { container } = render(
			<Highlight text="Hello, world!" ranges={null} />,
		);
		expect(container.textContent).toBe("Hello, world!");
	});

	it("renders text without highlights when ranges are empty", () => {
		const { container } = render(
			<Highlight text="Hello, world!" ranges={[]} />,
		);
		expect(container.textContent).toBe("Hello, world!");
	});

	it("highlights text based on provided ranges", () => {
		const { container } = render(
			<Highlight
				text="Hello, world!"
				ranges={[
					[0, 4], // "Hello"
					[7, 11], // "world"
				]}
			/>,
		);
		const spans = container.querySelectorAll("span");
		expect(spans).toHaveLength(2);
		expect(spans[0].textContent).toBe("Hello");
		expect(spans[1].textContent).toBe("world");
	});

	it("applies custom styles and className to highlighted text", () => {
		const customStyle = { color: "red" };
		const customClassName = "highlighted";
		const { container } = render(
			<Highlight
				text="Hello, world!"
				ranges={[[0, 4]]}
				style={customStyle}
				className={customClassName}
			/>,
		);
		const span = container.querySelector("span");
		expect(span).toHaveStyle("color: rgb(255, 0, 0);");
		expect(span).toHaveClass("highlighted");
	});

	it("renders remaining text after the last highlight", () => {
		const { container } = render(
			<Highlight text="Hello, world!" ranges={[[0, 4]]} />,
		);
		expect(container.textContent).toBe("Hello, world!");
	});

	it("handles invalid ranges gracefully", () => {
		const { container } = render(
			<Highlight text="Hello, world!" ranges={[[5, 3]]} />,
		);
		expect(container.firstChild).toBeNull();
	});
});

describe("createHighlightComponent", () => {
	it("creates a custom Highlight component with default styles and className", () => {
		const customStyle = { backgroundColor: "blue" };
		const customClassName = "custom-highlight";
		const CustomHighlight = createHighlightComponent(
			customStyle,
			customClassName,
		);

		const { container } = render(
			<CustomHighlight text="Hello, world!" ranges={[[0, 4]]} />,
		);
		const span = container.querySelector("span");
		expect(span).toHaveStyle("background-color: rgb(0, 0, 255);");
		expect(span).toHaveClass("custom-highlight");
	});
});

import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "../Button";

describe("Button component", () => {
  test("renders button with correct children and attributes", () => {
    const children = "Click me";
    const type = "button";
    const id = "my-button";
    const onClick = jest.fn();

    render(
      <Button type={type} id={id} onClick={onClick}>
        {children}
      </Button>,
    );

    const buttonElement = screen.getByRole("button", { name: children });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(children);
    expect(buttonElement).toHaveAttribute("type", type);
    expect(buttonElement).toHaveAttribute("id", id);
  });

  test("calls onClick callback when button is clicked", async () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Click me</Button>);

    const buttonElement = screen.getByRole("button", { name: /click me/i });

    await userEvent.click(buttonElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

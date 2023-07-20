import React, { use } from "react";

import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "../Input";

describe("Input component", () => {
  test("renders input field with correct label and value", () => {
    const label = "Name";
    const value = "John Doe";
    const onChange = jest.fn();

    render(<Input label={label} value={value} onChange={onChange} id="name" />);

    const inputElement = screen.getByLabelText(label) as HTMLInputElement;

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(value);
  });

  test("calls onChange callback when input value changes", async () => {
    const label = "Name";
    const onChange = jest.fn();

    render(<Input label={label} value="" onChange={onChange} id="name" />);

    const inputElement = screen.getByLabelText(label) as HTMLInputElement;
    const newValue = "J";

    await act(async () => {
      await userEvent.type(inputElement, newValue);
    });

    expect(onChange).toHaveBeenCalledWith(newValue);
  });
});

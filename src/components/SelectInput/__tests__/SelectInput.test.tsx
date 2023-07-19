import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import { SelectInput } from "../SelectInput";

describe("SelectInput component", () => {
  const label = "Industry";
  const testId = "select-industry";
  const options = [
    { label: "IT", id: "it" },
    { label: "Healthcare", id: "healthcare" },
    { label: "Finance", id: "finance" },
  ];
  const value = "it";
  const onChange = jest.fn();

  beforeEach(() => {
    render(
      <SelectInput
        label={label}
        testid={testId}
        value={value}
        onChange={onChange}
        data={options}
        id="search-id"
      />,
    );
  });

  test("renders select input field with correct label and value", () => {
    const selectElement = screen.getByTestId(testId) as HTMLSelectElement;

    expect(selectElement).toBeInTheDocument();
    expect(selectElement.value).toBe(value);
  });

  test("calls onChange callback when select value changes", () => {
    const selectElement = screen.getByTestId(testId) as HTMLSelectElement;
    const newValue = "healthcare";

    fireEvent.change(selectElement, { target: { value: newValue } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(newValue);
  });

  test("renders correct number of options", () => {
    const selectElement = screen.getByTestId(testId) as HTMLSelectElement;
    const optionElements = selectElement.querySelectorAll("option");

    expect(optionElements.length).toBe(options.length);
  });
});

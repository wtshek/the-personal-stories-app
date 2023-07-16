import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchForm } from "../SearchForm";

describe("Search Form Test Suite", () => {
  const industriesMock = [
    {
      id: "64b2bcb7d494db4be50a9abe",
      label: "Agriculture and Farming",
    },
    { id: "64b2bcb7d494db4be50a9abf", label: "Automotive" },
    { id: "64b2bcb7d494db4be50a9ac0", label: "Aviation" },
  ];

  const gendersMock = [
    { id: "64b2bcb7d494db4be50a9abc", label: "Female" },
    { id: "64b2bcb7d494db4be50a9abd", label: "Male" },
  ];

  const onSearchClickMock = jest.fn();

  it("call the search api when the search button is click", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <SearchForm
        industries={industriesMock}
        genders={gendersMock}
        onSearch={onSearchClickMock}
      />,
    );

    // typing input
    await userEvent.type(getByPlaceholderText("Search here..."), "Happy");
    await userEvent.type(getByPlaceholderText("Location"), "London");
    await userEvent.selectOptions(getByTestId("industry-select"), "Aviation");
    await userEvent.selectOptions(getByTestId("gender-select"), "Female");

    const submitButton = getByText("Search");
    await userEvent.click(submitButton);

    expect(onSearchClickMock).toHaveBeenCalledTimes(1);
    expect(onSearchClickMock).toHaveBeenCalledWith({
      industry: "64b2bcb7d494db4be50a9ac0",
      gender: "64b2bcb7d494db4be50a9abc",
      searchTerm: "Happy",
      location: "London",
    });

    // TODO: call api
  });
});

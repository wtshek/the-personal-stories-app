import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { gendersMock, industriesMock } from "@/utils/mockData";

import { CreateStoryForm } from "../CreateStoryForm";

describe("Create Story Form Suite", () => {
  const onCreateMock = jest.fn();

  const renderComponent = (type = "CREATE") =>
    render(
      <CreateStoryForm
        genders={gendersMock}
        industries={industriesMock}
        onSubmit={onCreateMock}
        type={type as "CREATE" | "EDIT"}
      />,
    );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render the create form", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("should render the edit form", () => {
    const { container } = renderComponent("EDIT");
    expect(container).toMatchSnapshot();
  });

  it("should submit the form", async () => {
    // TODO: include the react quill test

    renderComponent();
    const businessNameInput = screen.getByLabelText("Business Name:");
    const locationInput = screen.getByLabelText("Location:");
    const industrySelect = screen.getByLabelText("Industry:");
    const genderSelect = screen.getByLabelText("Gender:");
    const websiteInput = screen.getByLabelText("Website:");
    const linkedInInput = screen.getByLabelText("LinkedIn:");
    const facebookInput = screen.getByLabelText("Facebook:");
    const instagramInput = screen.getByLabelText("Instagram:");
    const submitButton = screen.getByText("Submit");

    // Fill in the form fields
    await userEvent.type(businessNameInput, "Test Business");
    await userEvent.type(locationInput, "Test Location");
    await userEvent.selectOptions(industrySelect, industriesMock[0].id);
    await userEvent.selectOptions(genderSelect, gendersMock[0].id);
    await userEvent.type(websiteInput, "http://test-website.com");
    await userEvent.type(linkedInInput, "http://linkedin.com/test");
    await userEvent.type(facebookInput, "http://facebook.com/test");
    await userEvent.type(instagramInput, "http://instagram.com/test");

    // Submit the form
    await userEvent.click(submitButton);

    // Expect the onCreate function to be called with the form data
    expect(onCreateMock).toHaveBeenCalledWith({
      businessName: "Test Business",
      location: "Test Location",
      industry: industriesMock[0].id,
      gender: gendersMock[0].id,
      story: "",
      website: "http://test-website.com",
      linkedIn: "http://linkedin.com/test",
      facebook: "http://facebook.com/test",
      instagram: "http://instagram.com/test",
    });
  });
});
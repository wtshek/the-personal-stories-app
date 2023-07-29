import { StoryDataInputType } from "../type";
import { isStoryInputValid } from "../utils";

// Replace 'your-file' with the correct path to the file containing the isStoryInputValid function

describe("isStoryInputValid", () => {
  test("should return false when invalid data is provided", () => {
    const invalidData: StoryDataInputType = {
      businessName: "",
      address: "",
      linkedIn: "invalid-linkedin-url",
      instagram: "invalid-instagram-url",
      website: "invalid-website-url",
      facebook: "invalid-facebook-url",
      industryId: "",
      genderId: "",
      story: "",
      owner: "",
      latitude: 0,
      longitude: 0,
    };

    const result = isStoryInputValid(invalidData);
    expect(result).toBe(false);
  });

  test("should return true when valid data is provided", () => {
    const validData = {
      businessName: "Example Business",
      address: "123 Main Street",
      linkedIn: "https://www.linkedin.com/company/example",
      instagram: "https://www.instagram.com/example",
      website: "https://www.example.com",
      facebook: "https://www.facebook.com/example",
      industryId: "exampleIndustry",
      genderId: "exampleGender",
      story: "This is a test story.",
      owner: "John Doe",
      latitude: 40.7128,
      longitude: -74.006,
    };

    const result = isStoryInputValid(validData);
    expect(result).toBe(true);
  });
});

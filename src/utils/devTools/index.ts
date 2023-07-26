import { faker } from "@faker-js/faker";

const industriesMock = [
  {
    id: "64b2bcb7d494db4be50a9abe",
    label: "Agriculture and Farming",
  },
  { id: "64b2bcb7d494db4be50a9abf", label: "Automotive" },
  { id: "64b2bcb7d494db4be50a9ac0", label: "Aviation" },
  { id: "64b2bcb7d494db4be50a9ac3", label: "Chemical" },
  { id: "64b2bcb7d494db4be50a9ac8", label: "Energy" },
];

const gendersMock = [
  { id: "64b2bcb7d494db4be50a9abc", label: "Female" },
  { id: "64b2bcb7d494db4be50a9abd", label: "Male" },
];

// Generate random coordinates for different cities
const randomLocations = [
  { city: "New York", lat: "40.7128", long: "-74.0060" },
  { city: "Los Angeles", lat: "34.0522", long: "-118.2437" },
  { city: "Chicago", lat: "41.8781", long: "-87.6298" },
  { city: "London", lat: "51.5074", long: "-0.1278" },
  { city: "Paris", lat: "48.8566", long: "2.3522" },
  { city: "Tokyo", lat: "35.682839", long: "139.759455" },
  // Add more cities here...
];

export const getRandomStoryData = (num = 20): StoryData[] => {
  const result: StoryData[] = [];

  for (let i = 0; i < num; i++) {
    const randomIndustryIndex = Math.floor(
      Math.random() * industriesMock.length,
    );
    const randomGenderIndex = Math.floor(Math.random() * gendersMock.length);
    const randomLocationIndex = Math.floor(
      Math.random() * randomLocations.length,
    );
    const randomLocation = randomLocations[randomLocationIndex];

    result.push({
      id: faker.string.uuid(),
      name: faker.company.name(),
      story: `<p>${faker.lorem.paragraph()}</p>`,
      owner: faker.name.fullName(),
      address: randomLocation.city,
      lat_long: [randomLocation.lat, randomLocation.long],
      linkedIn: faker.internet.url(),
      instagram: faker.internet.url(),
      facebook: faker.internet.url(),
      website: faker.internet.url(),
      industryId: industriesMock[randomIndustryIndex].id,
      genderId: gendersMock[randomGenderIndex].id,
      gender: gendersMock[randomGenderIndex],
      industry: industriesMock[randomIndustryIndex],
    });
  }

  return result;
};

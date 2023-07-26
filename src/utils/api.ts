import prisma from "@/prisma/prisma";

export const openCageBaseURL = "https://api.opencagedata.com/geocode/v1/json";

export const getLatitudeLongitude = async (
  location: string,
): Promise<[string, string] | undefined> => {
  const res = await fetch(
    `${openCageBaseURL}?q=${location}&key=${process.env.OPENCAGE_KEY}&pretty=1`,
  );

  const { results } = await res.json();

  if (!results.length) {
    return undefined;
  }
  const { geometry } = results?.[0];

  return [String(geometry.lat), String(geometry.lng)];
};

export const getSearchOptions = async () => {
  const genders = await prisma.gender.findMany();
  const industries = await prisma.industry.findMany();

  return { genders, industries };
};

export const getUserStory = async (userId?: string): Promise<unknown[]> => {
  const story = await prisma.story.findMany({
    where: {
      userId,
    },
    include: {
      gender: true,
      industry: true,
    },
  });

  return story;
};

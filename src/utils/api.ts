import prisma from "@/prisma/prisma";

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

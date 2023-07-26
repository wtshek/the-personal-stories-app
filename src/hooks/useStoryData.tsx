import { cache, use } from "react";

import prisma from "@/prisma/prisma";

const MAX_ITEM_PER_PAGE = 20;

const getStory = cache(async (id?: string) => {
  const data = id
    ? await prisma.story.findUnique({
        where: { id },
        include: { gender: true, industry: true },
      })
    : await prisma.story.findMany({
        include: { gender: true, industry: true },
        take: MAX_ITEM_PER_PAGE,
      });

  return data;
});
export const useStoryData = (id?: string) => {
  return use(getStory(id));
};

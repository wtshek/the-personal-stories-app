import { cache, use } from "react";

import prisma from "@/prisma/prisma";

const getSearchOptions = cache(async () => {
  const genders = await prisma.gender.findMany();
  const industries = await prisma.industry.findMany();

  return { genders, industries };
});
export const useSearchOption = () => {
  return use(getSearchOptions());
};

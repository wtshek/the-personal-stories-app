import { cache, use } from "react";

import { CreateStoryFormClient as CreateStoryForm } from "@/components/StoryForm";
import prisma from "@/prisma/prisma";

const getSearchOptions = cache(async () => {
  const genders = await prisma.gender.findMany();
  const industries = await prisma.industry.findMany();

  return { genders, industries };
});

export default function Page() {
  const { genders, industries } = use(getSearchOptions());

  return <CreateStoryForm genders={genders} industries={industries} />;
}

import React from "react";

import { CreateStoryFormClient as CreateStoryForm } from "@/components/StoryForm";
import { getSearchOptions } from "@/utils/api";

export const Page = async () => {
  const { genders, industries } = await getSearchOptions();
  return <CreateStoryForm genders={genders} industries={industries} />;
};

export default Page;

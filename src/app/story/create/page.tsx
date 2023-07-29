import React from "react";

import { StoryFormClient as StoryForm } from "@/components/StoryForm";
import { getSearchOptions } from "@/utils/api";
import { TYPE } from "@/utils/type";

export const Page = async () => {
  const { genders, industries } = await getSearchOptions();
  return (
    <StoryForm genders={genders} industries={industries} type={TYPE.CREATED} />
  );
};

export default Page;

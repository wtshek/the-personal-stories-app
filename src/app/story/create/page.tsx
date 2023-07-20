import React from "react";

import { CreateStoryFormClient as CreateStoryForm } from "@/components/StoryForm";
import { useSearchOption } from "@/hooks/useSearchOption";

export const Page = () => {
  const { genders, industries } = useSearchOption();
  return <CreateStoryForm genders={genders} industries={industries} />;
};

export default Page;

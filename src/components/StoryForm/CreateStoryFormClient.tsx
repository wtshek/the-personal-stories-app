"use client";

import { FC } from "react";

import { CreateStoryForm, CreateStoryFormBaseProps } from "./CreateStoryForm";

export const CreateStoryFormClient: FC<CreateStoryFormBaseProps> = ({
  industries,
  genders,
}) => {
  const onSubmit = (arg: {
    businessName: string;
    location: string;
    linkedIn: string;
    instagram: string;
    website: string;
    facebook: string;
    industry: string;
    gender: string;
    story: string;
  }) => console.log(arg);

  return (
    <CreateStoryForm
      industries={industries}
      genders={genders}
      onSubmit={onSubmit}
      type="CREATE"
    />
  );
};

"use client";

import { FC } from "react";

import { CreateStoryForm, CreateStoryFormBaseProps } from "./CreateStoryForm";

export const CreateStoryFormClient: FC<CreateStoryFormBaseProps> = ({
  industries,
  genders,
}) => {
  const onSubmit = async (arg: {
    businessName: string;
    location: string;
    linkedIn: string;
    instagram: string;
    website: string;
    facebook: string;
    industry: string;
    gender: string;
    story: string;
    owner: string;
  }) => {
    const res = await fetch("/api/story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });

    console.log(res);
  };

  return (
    <CreateStoryForm
      industries={industries}
      genders={genders}
      onSubmit={onSubmit}
      type="CREATE"
    />
  );
};

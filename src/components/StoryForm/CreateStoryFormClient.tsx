"use client";

import { FC, useState } from "react";

import { useRouter } from "next/navigation";

import { statusCode } from "@/utils/const";

import {
  CreateStoryForm,
  CreateStoryFormBaseProps,
  TYPE,
} from "./CreateStoryForm";

export const CreateStoryFormClient: FC<CreateStoryFormBaseProps> = ({
  industries,
  genders,
}) => {
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();

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

    if (res.status === statusCode.UNAUTHORIZED) {
      setError("Please login to submit a new story");
      return;
    }

    if (res.status === statusCode.INTERNAL_ERROR) {
      setError("An error occur, please try again later");
      return;
    }

    router.push("/");
  };

  return (
    <CreateStoryForm
      industries={industries}
      genders={genders}
      onSubmit={onSubmit}
      type={TYPE.CREATED}
      error={error}
    />
  );
};

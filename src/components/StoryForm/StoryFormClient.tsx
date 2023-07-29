"use client";

import { FC, useState } from "react";

import { useRouter } from "next/navigation";

import { statusCode } from "@/utils/const";
import { StoryDataInputType, TYPE } from "@/utils/type";

import { StoryForm, StoryFormBaseProps } from "./StoryForm";

export const StoryFormClient: FC<StoryFormBaseProps> = ({
  industries,
  genders,
  data,
  type,
}) => {
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();

  const onSubmit = async (arg: StoryDataInputType) => {
    const res = await fetch("/api/story", {
      method: type === TYPE.CREATED ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    });

    if (res.status === statusCode.UNAUTHORIZED) {
      setError("Please login to submit a new story");
      return;
    }

    if (res.status === statusCode.BAD_REQUEST) {
      setError("Invalid Input");
      return;
    }

    if (res.status === statusCode.INTERNAL_ERROR) {
      setError("An error occur, please try again later");
      return;
    }

    router.push("/");
  };

  const onDelete = async (id: string) => {
    if (type !== TYPE.EDIT || id === "") return;

    const res = await fetch("/api/story", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.status === statusCode.INTERNAL_ERROR) {
      setError("An error occur, please try again later");
      return;
    }

    router.push("/");
  };

  return (
    <StoryForm
      industries={industries}
      genders={genders}
      onSubmit={onSubmit}
      type={type}
      error={error}
      data={data}
      onDelete={onDelete}
    />
  );
};

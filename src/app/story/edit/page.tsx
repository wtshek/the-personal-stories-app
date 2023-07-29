import React from "react";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { StoryFormClient as StoryForm } from "@/components/StoryForm";
import prisma from "@/prisma/prisma";
import { getSearchOptions } from "@/utils/api";
import { TYPE } from "@/utils/type";
import { mappedPrismaStory } from "@/utils/utils";

// TODO: convert the data from prisma to the same as storydatainputtype

const Page = async () => {
  const { genders, industries } = await getSearchOptions();
  const { user } = (await getServerSession(authOptions)) || {};
  const { id } = user || {};
  const prismaData = await prisma.story.findMany({
    where: {
      user: {
        id: id,
      },
    },
  });
  const data = mappedPrismaStory(prismaData[0]);

  return (
    <StoryForm
      data={data}
      type={TYPE.EDIT}
      genders={genders}
      industries={industries}
    />
  );
};

export default Page;

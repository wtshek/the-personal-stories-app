import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import validator from "validator";

import prisma from "@/prisma/prisma";
import { statusCode } from "@/utils/const";

import { authOptions } from "../auth/[...nextauth]/route";

// TODO: use middleware

export async function POST(request: Request) {
  try {
    const {
      businessName,
      address,
      linkedIn,
      instagram,
      website,
      facebook,
      industry,
      gender,
      story,
      owner,
      latitude,
      longitude,
    } = await request.json();
    const { user } = (await getServerSession(authOptions)) || {};

    if (!user) {
      return NextResponse.json({}, { status: statusCode.UNAUTHORIZED });
    }

    if (
      validator.isEmpty(businessName) ||
      validator.isEmpty(story) ||
      validator.isEmpty(address) ||
      validator.isEmpty(gender) ||
      validator.isEmpty(industry) ||
      validator.isEmpty(owner) ||
      validator.isEmpty(latitude) ||
      validator.isEmpty(longitude)
    ) {
      return NextResponse.json({}, { status: statusCode.BAD_REQUEST });
    }

    if (
      (!validator.isEmpty(website) && !validator.isURL(website)) ||
      (!validator.isEmpty(instagram) && !validator.isURL(instagram)) ||
      (!validator.isEmpty(linkedIn) && !validator.isURL(linkedIn)) ||
      (!validator.isEmpty(facebook) && !validator.isURL(facebook))
    ) {
      console.log("invalid url");
      return NextResponse.json({}, { status: statusCode.BAD_REQUEST });
    }

    // validate industry and gender objectID
    await prisma.industry.findUniqueOrThrow({
      where: {
        id: industry,
      },
    });

    await prisma.gender.findUniqueOrThrow({
      where: {
        id: gender,
      },
    });

    await prisma.story.create({
      data: {
        name: businessName,
        story: story,
        owner,
        lat_long: [latitude, longitude],
        address,
        instagram,
        facebook,
        website,
        linkedIn,
        gender: {
          connect: { id: gender },
        },
        industry: {
          connect: { id: industry },
        },
        user: {
          connect: { id: user.id },
        },
      },
    });

    return NextResponse.json({}, { status: statusCode.CREATED });
  } catch (e) {
    console.error(e);
    return NextResponse.json({}, { status: statusCode.INTERNAL_ERROR });
  }
}

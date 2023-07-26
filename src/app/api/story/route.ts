import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import validator from "validator";

import prisma from "@/prisma/prisma";
import { getLatitudeLongitude } from "@/utils/api";
import { statusCode } from "@/utils/const";

import { authOptions } from "../auth/[...nextauth]/route";

// TODO: use middleware

export async function POST(request: Request) {
  try {
    const {
      businessName,
      location,
      linkedIn,
      instagram,
      website,
      facebook,
      industry,
      gender,
      story,
      owner,
    } = await request.json();
    const { user } = (await getServerSession(authOptions)) || {};

    if (!user) {
      return NextResponse.json({ statusCode: statusCode.UNAUTHORIZED });
    }

    if (
      validator.isEmpty(businessName) ||
      validator.isEmpty(story) ||
      validator.isEmpty(location) ||
      validator.isEmpty(gender) ||
      validator.isEmpty(industry) ||
      validator.isEmpty(owner)
    ) {
      return NextResponse.json({ statusCode: statusCode.BAD_REQUEST });
    }

    if (
      !validator.isURL(website) ||
      !validator.isURL(instagram) ||
      !validator.isURL(linkedIn) ||
      !validator.isURL(facebook)
    ) {
      return NextResponse.json({ statusCode: statusCode.BAD_REQUEST });
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

    // convert location from string to [lon, lat]
    const latitudeLongitude = await getLatitudeLongitude(location);

    console.log(latitudeLongitude);

    if (!latitudeLongitude) {
      return NextResponse.json({ statusCode: statusCode.BAD_REQUEST });
    }

    await prisma.story.create({
      data: {
        name: businessName,
        story: story,
        owner,
        lat_long: latitudeLongitude,
        address: location,
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

    return NextResponse.json({ statusCode: statusCode.CREATED });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ statusCode: statusCode.INTERNAL_ERROR });
  }
}

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/prisma/prisma";
import { statusCode } from "@/utils/const";
import { isStoryInputValid } from "@/utils/utils";

import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      businessName,
      address,
      linkedIn,
      instagram,
      website,
      facebook,
      industryId,
      genderId,
      story,
      owner,
      latitude,
      longitude,
    } = data;
    const { user } = (await getServerSession(authOptions)) || {};

    if (!user) {
      return NextResponse.json({}, { status: statusCode.UNAUTHORIZED });
    }

    if (!isStoryInputValid(data)) {
      return NextResponse.json({}, { status: statusCode.BAD_REQUEST });
    }

    // validate industry and gender objectID
    await prisma.industry.findUniqueOrThrow({
      where: {
        id: industryId,
      },
    });

    await prisma.gender.findUniqueOrThrow({
      where: {
        id: genderId,
      },
    });

    await prisma.story.create({
      data: {
        businessName,
        story,
        owner,
        lat_long: [String(latitude), String(longitude)],
        address,
        instagram,
        facebook,
        website,
        linkedIn,
        gender: {
          connect: { id: genderId },
        },
        industry: {
          connect: { id: industryId },
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

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const {
      businessName,
      address,
      linkedIn,
      instagram,
      website,
      facebook,
      industryId,
      genderId,
      story,
      owner,
      latitude,
      longitude,
      id,
    } = data;
    const { user } = (await getServerSession(authOptions)) || {};

    if (!user) {
      return NextResponse.json({}, { status: statusCode.UNAUTHORIZED });
    }

    if (!isStoryInputValid(data)) {
      return NextResponse.json({}, { status: statusCode.BAD_REQUEST });
    }

    await prisma.story.update({
      where: {
        id: id,
      },
      data: {
        businessName,
        story,
        owner,
        lat_long: [String(latitude), String(longitude)],
        address,
        instagram,
        facebook,
        website,
        linkedIn,
        gender: {
          connect: { id: genderId },
        },
        industry: {
          connect: { id: industryId },
        },
      },
    });

    return NextResponse.json({}, { status: statusCode.OK });
  } catch (e) {
    console.error(e);
    return NextResponse.json({}, { status: statusCode.INTERNAL_ERROR });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const { user } = (await getServerSession(authOptions)) || {};

    if (!user) {
      return NextResponse.json({}, { status: statusCode.UNAUTHORIZED });
    }

    await prisma.story.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({}, { status: statusCode.OK });
  } catch (e) {
    console.error(e);
    return NextResponse.json({}, { status: statusCode.INTERNAL_ERROR });
  }
}

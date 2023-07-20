import validator from "validator";

import prisma from "@/prisma/prisma";
import { getLatitudeLongitude } from "@/utils/api";

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

    if (
      validator.isEmpty(businessName) ||
      validator.isEmpty(story) ||
      validator.isEmpty(location) ||
      validator.isEmpty(gender) ||
      validator.isEmpty(industry) ||
      validator.isEmpty(owner)
    ) {
      return new Response("Please provide a valid input", { status: 400 });
    }

    if (
      !validator.isURL(website) ||
      !validator.isURL(instagram) ||
      !validator.isURL(linkedIn) ||
      !validator.isURL(facebook)
    ) {
      return new Response("Please provide a valid input", { status: 400 });
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

    if (!latitudeLongitude) {
      return new Response("Please provide a valid location", { status: 400 });
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
      },
    });

    return new Response("Created", { status: 201 });
  } catch (e) {
    console.error(e);
    return new Response("API failed. Please contact administrator", {
      status: 500,
    });
  }
}

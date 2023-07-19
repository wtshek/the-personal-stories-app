import { NextResponse } from "next/server";

import prisma from "@/prisma/prisma";
import {
  gender as genderConfig,
  industries as industriesConfig,
} from "@/utils/config";

export async function GET() {
  let gender, industries;

  gender = await prisma.gender.findMany();
  industries = await prisma.industry.findMany();

  // didn't setup database
  if (!gender.length || !industries.length) {
    gender = await prisma.gender.createMany({ data: genderConfig });
    industries = await prisma.industry.createMany({ data: industriesConfig });
  }

  return NextResponse.json({ gender, industries });
}

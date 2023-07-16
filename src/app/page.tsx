import { cache, use } from "react";

import dynamic from "next/dynamic";

import { SearchFormClient as SearchForm } from "@/components/SearchForm";
import prisma from "@/prisma/prisma";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const getSearchOptions = cache(async () => {
  const genders = await prisma.gender.findMany();
  const industries = await prisma.industry.findMany();

  return { genders, industries };
});

export default function Home() {
  const { genders, industries } = use(getSearchOptions());

  return (
    <div className="bg-white flex">
      <div className="w-[400px]">
        <SearchForm industries={genders} genders={industries} />
      </div>
      <Map />
    </div>
  );
}

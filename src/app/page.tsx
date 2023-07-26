import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

import { SignInButton } from "@/components/Button";
import { ProfileSetting } from "@/components/ProfileSetting/ProfileSetting";
import { SearchFormClient as SearchForm } from "@/components/SearchForm";
import { useStoryData } from "@/hooks/useStoryData";
import { getSearchOptions, getUserStory } from "@/utils/api";
import { getRandomStoryData } from "@/utils/devTools";

import { authOptions } from "./api/auth/[...nextauth]/route";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default async function Home() {
  // const data = useStoryData();
  const session = await getServerSession(authOptions);
  const { email, id } = session?.user || {};
  const stories = await getUserStory(id);
  const isLoggedIn = !!email;

  const data = getRandomStoryData(40);
  const { genders, industries } = await getSearchOptions();

  return (
    <div className="flex">
      <div className="w-[400px] p-8 flex flex-col">
        <SearchForm industries={genders} genders={industries} />
        <hr className="mt-auto" />
        {isLoggedIn ? (
          <ProfileSetting email={email} />
        ) : (
          <SignInButton className="mt-4 w-full" />
        )}
      </div>
      <Map data={data as StoryData[]} />
    </div>
  );
}

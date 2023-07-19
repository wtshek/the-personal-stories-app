import dynamic from "next/dynamic";

import { SearchFormClient as SearchForm } from "@/components/SearchForm";
import { useSearchOption } from "@/hooks/useSearchOption";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Home() {
  const { genders, industries } = useSearchOption();

  return (
    <div className="flex">
      <div className="w-[400px] p-8 flex flex-col">
        <SearchForm industries={genders} genders={industries} />
        <hr className="mt-auto" />
        <button
          data-modal-target="newStoryModal"
          data-modal-toggle="newStoryModal"
          className="mt-4 bg-blue-700 text-white rounded-md py-2 px-4"
        >
          Create new stories
        </button>
      </div>
      <Map />
    </div>
  );
}

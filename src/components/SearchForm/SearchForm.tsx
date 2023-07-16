"use client";

import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

export type SearchFormBaseProps = {
  industries: {
    id: string;
    label: string;
  }[];
  genders: {
    id: string;
    label: string;
  }[];
};

export type SearchFormProps = SearchFormBaseProps & {
  onSearch: ({
    industry,
    gender,
  }: {
    industry?: string;
    gender?: string;
    searchTerm?: string;
    location?: string;
  }) => void;
};

export const SearchForm: FC<SearchFormProps> = ({
  industries,
  genders,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [gender, setGender] = useState("");

  const onInputChange =
    (cb: Dispatch<SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      cb(e.target.value);
    };

  const onSearchClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch({ searchTerm, location, industry, gender });
  };

  return (
    <div className="p-8 w-full flex">
      <form className="flex flex-col gap-8 w-full" onSubmit={onSearchClick}>
        <div>
          <label htmlFor="query">Search: </label>
          <input
            placeholder="Search here..."
            className="rounded-md border-2 border-gray-400 py-2 px-4 w-full"
            id="query"
            value={searchTerm}
            onChange={onInputChange(setSearchTerm)}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            placeholder="Location"
            className="rounded-md border-2 border-gray-400 py-2 px-4 w-full"
            value={location}
            onChange={onInputChange(setLocation)}
          />
        </div>
        <div>
          <label htmlFor="industry">Industry:</label>
          <select
            data-testid="industry-select"
            className="rounded-md py-2 px-4 w-full"
            id="industry"
            value={industry || ""}
            onChange={onInputChange(setIndustry)}
          >
            {industries.map((industry) => (
              <option value={industry.id} key={industry.id}>
                {industry.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            data-testid="gender-select"
            className="rounded-md py-2 px-4 w-full"
            id="gender"
            value={gender || ""}
            onChange={onInputChange(setGender)}
          >
            {genders.map((gender) => (
              <option value={gender.id} key={gender.id}>
                {gender.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-fit border-2 border-blue-700 px-4 py-2 rounded-md text-white bg-blue-700"
        >
          Search
        </button>
      </form>
    </div>
  );
};

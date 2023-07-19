"use client";

import React, { FC, FormEvent, useState } from "react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SelectInput } from "@/components/SelectInput";

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

  const onSearchClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch({ searchTerm, location, industry, gender });
  };

  return (
    <div className="w-full flex">
      <form className="flex flex-col gap-8 w-full" onSubmit={onSearchClick}>
        <Input
          label="Search: "
          id="query"
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search here..."
        />
        <Input
          label="Location: "
          id="location"
          placeholder="Location"
          onChange={setLocation}
          value={location}
        />

        <SelectInput
          label="Industry: "
          testid="industry-select"
          id="industry"
          data={industries}
          onChange={setIndustry}
          value={industry}
        />

        <SelectInput
          label="Gender: "
          testid="gender-select"
          id="gender"
          data={genders}
          onChange={setGender}
          value={gender}
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
};

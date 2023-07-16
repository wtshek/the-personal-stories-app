"use client";

import { FC } from "react";

import { SearchForm, SearchFormBaseProps } from "./SearchForm";

export const SearchFormClient: FC<SearchFormBaseProps> = ({
  industries,
  genders,
}) => {
  const onSearch = () => console.log("search");

  return (
    <SearchForm industries={industries} genders={genders} onSearch={onSearch} />
  );
};

"use client";

import React, { FC, FormEvent, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SelectInput } from "@/components/SelectInput";

// TODO: add image feature

export type CreateStoryFormBaseProps = {
  industries: {
    id: string;
    label: string;
  }[];
  genders: {
    id: string;
    label: string;
  }[];
};

export enum TYPE {
  CREATED = "CREATED",
  EDIT = "EDIT",
}

export type CreateStoryFormProps = CreateStoryFormBaseProps & {
  onSubmit: (arg: {
    businessName: string;
    location: string;
    linkedIn: string;
    instagram: string;
    website: string;
    facebook: string;
    industry: string;
    gender: string;
    story: string;
    owner: string;
  }) => void;
  type: TYPE;
  error?: string;
};

export const CreateStoryForm: FC<CreateStoryFormProps> = ({
  industries,
  genders,
  onSubmit,
  type,
  error,
}) => {
  const [businessName, setBusinessName] = useState("");
  const [owner, setOwner] = useState("");
  const [location, setLocation] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [industry, setIndustry] = useState(industries[0].id);
  const [gender, setGender] = useState(genders[0].id);
  const [story, setStory] = useState("");
  const isCreate = type === TYPE.CREATED;
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.({
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
    });
  };

  return (
    <div className="max-w-[1400px] m-auto my-16 px-16">
      <h1 className="text-center text-blue-700 font-bold  text-5xl">
        {isCreate ? "Submit Your Story!" : "Edit Your Story!"}
      </h1>
      <form className="flex flex-col gap-4" onSubmit={onFormSubmit}>
        <Input
          value={businessName}
          onChange={setBusinessName}
          label="Business Name: "
          id="businessName"
        />
        <Input
          value={location}
          onChange={setLocation}
          label="Location: "
          id="location"
        />
        <Input value={owner} onChange={setOwner} label="Owner: " id="owner" />
        <SelectInput
          value={industry}
          onChange={setIndustry}
          data={industries}
          label="Industry: "
          id="industry"
        />
        <SelectInput
          value={gender}
          onChange={setGender}
          data={genders}
          label="Gender: "
          id="gender"
        />
        <ReactQuill
          theme="snow"
          value={story}
          onChange={setStory}
          placeholder="Write your story here..."
        />
        <Input
          value={website}
          onChange={setWebsite}
          label="Website (optional): "
          id="website"
        />
        <Input
          value={linkedIn}
          onChange={setLinkedIn}
          label="LinkedIn: "
          id="linkedIn"
        />
        <Input
          value={facebook}
          onChange={setFacebook}
          label="Facebook (optional): "
          id="facebook"
        />
        <Input
          value={instagram}
          onChange={setInstagram}
          label="Instagram (optional): "
          id="instagram"
        />
        <Button type="submit">Submit</Button>
      </form>
      <div className="text-red">{error}</div>
    </div>
  );
};

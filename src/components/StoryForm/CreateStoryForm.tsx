"use client";

import React, { FC, FormEvent, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

import { Button as FlowbitButton, Tooltip } from "flowbite-react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SelectInput } from "@/components/SelectInput";

import InfoIcon from "../../../public/info.svg";

const ICON_WIDTH = 32;
const ICON_HEIGHT = 32;

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
    address: string;
    linkedIn: string;
    instagram: string;
    website: string;
    facebook: string;
    industry: string;
    gender: string;
    story: string;
    owner: string;
    latitude: string;
    longitude: string;
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
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
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
      address,
      longitude: String(longitude),
      latitude: String(latitude),
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
          value={address}
          onChange={setAddress}
          label="Address: "
          id="address"
        />
        <div className="flex gap-4 items-end">
          <Input
            value={latitude}
            onChange={setLatitude}
            label="Latitude"
            id="latitude"
          />
          <Input
            value={longitude}
            onChange={setLongitude}
            label="Longitude"
            id="longitude"
          />
          {/* <Image src={InfoIcon} alt="info-icon" width={32} height={32} /> */}
          <Tooltip
            content={
              <div>
                You can use this{" "}
                <a
                  className="text-blue-700 underline"
                  href="https://www.latlong.net/convert-address-to-lat-long.html"
                >
                  website
                </a>{" "}
                to convert you address to latitude and longitude
              </div>
            }
            style="light"
          >
            <button>
              <InfoIcon
                width={ICON_WIDTH}
                height={ICON_HEIGHT}
                className="fill-blue-700 stroke-1"
              />
            </button>
          </Tooltip>
          {/* <button data-popover-target="lat-long-popover">
            <InfoIcon
              width={ICON_WIDTH}
              height={ICON_HEIGHT}
              className="fill-blue-700 stroke-1"
            />
          </button>
          <div
            data-popover
            id="lat-long-popover"
            role="tooltip"
            className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
          >
            <div>You can use this link</div>
          </div> */}
        </div>
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

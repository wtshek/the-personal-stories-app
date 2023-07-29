"use client";

import React, { FC, FormEvent, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

import { Tooltip } from "flowbite-react";
import dynamic from "next/dynamic";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { SelectInput } from "@/components/SelectInput";
import { StoryDataInputType, TYPE } from "@/utils/type";

import InfoIcon from "../../../public/info.svg";

const ICON_WIDTH = 32;
const ICON_HEIGHT = 32;

// TODO: add image feature

export type StoryFormBaseProps = {
  industries: {
    id: string;
    label: string;
  }[];
  genders: {
    id: string;
    label: string;
  }[];
  data?: StoryDataInputType;
  type: TYPE;
};

export type StoryFormProps = StoryFormBaseProps & {
  onSubmit: (arg: StoryDataInputType) => void;
  onDelete: (id: string) => void;
  error?: string;
};

export const StoryForm: FC<StoryFormProps> = ({
  industries,
  genders,
  onSubmit,
  type,
  error,
  data,
  onDelete,
}) => {
  const [businessName, setBusinessName] = useState(data?.businessName || "");
  const [owner, setOwner] = useState(data?.owner || "");
  const [address, setAddress] = useState(data?.address || "");
  const [latitude, setLatitude] = useState(data?.latitude || undefined);
  const [longitude, setLongitude] = useState(data?.longitude || undefined);
  const [linkedIn, setLinkedIn] = useState(data?.linkedIn || "");
  const [instagram, setInstagram] = useState(data?.instagram || "");
  const [website, setWebsite] = useState(data?.website || "");
  const [facebook, setFacebook] = useState(data?.facebook || "");
  const [industry, setIndustry] = useState(
    data?.industryId || industries[0].id,
  );
  const [gender, setGender] = useState(data?.genderId || genders[0].id);
  const [story, setStory] = useState(data?.story || "");
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
      longitude: longitude as number,
      latitude: latitude as number,
      linkedIn,
      instagram,
      website,
      facebook,
      industryId: industry,
      genderId: gender,
      story,
      owner,
      id: data?.id,
    });
  };

  const onDeleteClick = () => {
    onDelete(data?.id || "");
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
            type="number"
          />
          <Input
            value={longitude}
            onChange={setLongitude}
            label="Longitude"
            id="longitude"
            type="number"
          />
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
          label="LinkedIn (optional): "
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
        <div className="flex justify-between">
          <Button type="submit">Submit</Button>
          {!isCreate && (
            <Button
              onClick={onDeleteClick}
              className="bg-red-700 border-red-700"
            >
              Delete
            </Button>
          )}
        </div>
      </form>
      <div className="text-red-700 font-bold">{error}</div>
    </div>
  );
};

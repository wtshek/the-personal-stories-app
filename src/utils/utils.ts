import validator from "validator";

import { StoryData, StoryDataInputType, StoryDataPrismaType } from "./type";

export const isStoryInputValid = (data: StoryDataInputType): boolean => {
  const {
    businessName,
    address,
    linkedIn,
    instagram,
    website,
    facebook,
    industryId,
    genderId,
    story,
    owner,
    latitude,
    longitude,
  } = data;

  return !(
    validator.isEmpty(businessName) ||
    validator.isEmpty(story) ||
    validator.isEmpty(address) ||
    validator.isEmpty(genderId) ||
    validator.isEmpty(industryId) ||
    validator.isEmpty(owner) ||
    validator.isEmpty(String(latitude)) ||
    validator.isEmpty(String(longitude)) ||
    (!validator.isEmpty(website) && !validator.isURL(website)) ||
    (!validator.isEmpty(instagram) && !validator.isURL(instagram)) ||
    (!validator.isEmpty(linkedIn) && !validator.isURL(linkedIn)) ||
    (!validator.isEmpty(facebook) && !validator.isURL(facebook))
  );
};

export const mappedPrismaStory = (
  data: StoryDataPrismaType,
): StoryDataInputType => {
  return {
    businessName: data.businessName,
    address: data.address,
    linkedIn: data.linkedIn || "",
    instagram: data.instagram || "",
    website: data.website || "",
    facebook: data.facebook || "",
    genderId: data.genderId,
    industryId: data.industryId,
    owner: data.owner,
    latitude: Number(data.lat_long[0]),
    longitude: Number(data.lat_long[1]),
    story: data.story,
    id: data.id,
  };
};

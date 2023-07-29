export interface StoryDataPrismaType {
  id: string;
  businessName: string;
  story: string;
  owner: string;
  address: string;
  lat_long: string[];
  linkedIn: string | null;
  instagram: string | null;
  facebook: string | null;
  website: string | null;
  userId: string;
  industryId: string;
  genderId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoryDataInputType {
  businessName: string;
  address: string;
  linkedIn: string;
  instagram: string;
  website: string;
  facebook: string;
  genderId: string;
  industryId: string;
  story: string;
  owner: string;
  latitude: number;
  longitude: number;
  id?: string;
}

export enum TYPE {
  CREATED = "CREATED",
  EDIT = "EDIT",
}

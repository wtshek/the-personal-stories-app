interface StoryData {
  id: string;
  name: string;
  story: string;
  owner: string;
  address: string;
  lat_long: [string, string];
  linkedIn: string;
  instagram: string;
  facebook: string;
  website: string;
  industryId: string;
  genderId: string;
  gender: { id: string; label: string };
  industry: { id: string; label: string };
  userId: string;
}

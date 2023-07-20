export const openCageBaseURL = "https://api.opencagedata.com/geocode/v1/json";

export const getLatitudeLongitude = async (
  location: string,
): Promise<[string, string] | undefined> => {
  const res = await fetch(
    `${openCageBaseURL}?q=${location}&key=${process.env.OPENCAGE_KEY}&pretty=1`,
  );

  const { results } = await res.json();

  if (!results.length) {
    return undefined;
  }
  const { geometry } = results?.[0];

  return [String(geometry.lat), String(geometry.lng)];
};

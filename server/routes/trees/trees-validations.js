export const validatePostTree = (req) => {
  const { common, scientific, city, lat, lng, datePlanted } = req?.body;

  if (common === undefined) return false;
  if (scientific === undefined) return false;
  if (city === undefined) return false;
  if (lat === undefined) return false;
  if (lng === undefined) return false;
  if (datePlanted === undefined) return false;

  return true;
}

export const validateGetTree = (req) => {
  const { id, sourceId, address, idReference: ref, lng, lat } = req?.query;

  if (id === undefined) return false;
  if (sourceId === undefined) return false;
  if (address === undefined) return false;
  if (lat === undefined) return false;
  if (lng === undefined) return false;
  if (id_reference === undefined) return false;

  return true;
}
function validatePostTree(req) {
  const { common, lat, lng, scientific, city, datePlanted } = req.body;

  if (common === undefined) return false;
  if (scientific === undefined) return false;
  if (city === undefined) return false;
  if (lat === undefined) return false;
  if (lng === undefined) return false;
  if (datePlanted === undefined) return false;

  return true;
}

module.exports = { validatePostTree };

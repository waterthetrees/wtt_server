function validatePostTree(req) {
  const { common, lat, lng, datePlanted } = req.body;

  if (common === undefined) return false;
  if (lat === undefined) return false;
  if (lng === undefined) return false;
  if (datePlanted === undefined) return false;

  return true;
}

module.exports = { validatePostTree };

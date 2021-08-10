function validatePostTree(req) {
  if (req.body.common === undefined) return false;
  if (req.body.lat === undefined) return false;
  if (req.body.lng === undefined) return false;
  if (req.body.datePlanted === undefined) return false;

  return true;
}

module.exports = { validatePostTree }

function validateGetTreeuser(req) {
  if (req.query.idTree === undefined) return false;
  if (req.query.email === undefined) return false;
  if (req.query.request === undefined) return false;

  return true;
}

module.exports = { validateGetTreeuser };

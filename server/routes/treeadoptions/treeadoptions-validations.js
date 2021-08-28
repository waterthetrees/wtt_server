function validatePostTreeAdoptions(req) {
  const { idTree, common, email, nickname, request } = req.body;

  if (idTree === undefined) return false;
  if (common === undefined) return false;
  if (email === undefined) return false;
  if (nickname === undefined) return false;
  if (request.type === undefined) return false;

  return true;
}

module.exports = {
  validatePostTreeAdoptions,
};

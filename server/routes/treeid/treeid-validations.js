export default function validateGetTreeId(req) {
 const { common, scientific, city, state, lat, lng } = req.body;

 if (common === undefined) return false;
 if (scientific === undefined) return false;
 if (city === undefined) return false;
 if (state === undefined) return false;
 if (lat === undefined) return false;
 if (lng === undefined) return false;

 return true;
}
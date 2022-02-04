function camelToSnakeCase(camelIn) {
  return camelIn.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export default function convertObjectKeysToSnakeCase(obj) {
  const newObj = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (key === key.toLowerCase()) {
      newObj[key] = obj[key];
    } else {
      newObj[camelToSnakeCase(key)] = obj[key];
    }
  }
  return newObj;
}
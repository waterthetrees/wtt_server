// function camelToSnakeCase(camelIn) {
//   return camelIn.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
// }

function camelToSnakeCase(camelIn) {
  return camelIn.replace(/[A-Z0-9]/g, (letter) => {
    if (/[A-Z]/.test(letter)) {
      return `_${letter.toLowerCase()}`;
    } else if (/[0-9]/.test(letter)) {
      return `_${letter}`;
    } else {
      return letter;
    }
  });
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

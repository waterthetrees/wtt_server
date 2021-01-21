function sortTrees(array) {
  const sorted = array.sort((a, b) => a.common.localeCompare(b.common));
  return sorted;
}

function snakeToCamelCase(snakeIn) {
  return snakeIn.replace(/(_\w)/g, (letter) => letter[1].toUpperCase());
}

function camelToSnakeCase(camelIn) {
  return camelIn.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function convertObjectToSnakeCase(obj) {
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

module.exports = {
  sortTrees,
  snakeToCamelCase,
  camelToSnakeCase,
  convertObjectToSnakeCase,
};

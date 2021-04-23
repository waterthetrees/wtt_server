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

function convertHealthToNumber(health) {
  // console.log('convertHealthToNumber health', health);
  if (!health) return 6;
  const healthValue = {
    good: 6,
    fair: 5,
    poor: 4,
    stump: 3,
    missing: 2,
    dead: 1,
    vacant: 0,
  }[health];
  return parseInt(healthValue, 10);
}

module.exports = {
  convertHealthToNumber,
  sortTrees,
  convertObjectToSnakeCase,
  snakeToCamelCase,
  camelToSnakeCase,
};

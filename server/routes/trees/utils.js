const convertHealthToNumber = (health) => {
  if (!health) return 6;

  const healthValue = {
    good: 6,
    fair: 5,
    poor: 4,
    stump: 3,
    missing: 2,
    dead: 1,
    vacant: 0,
  };

  return healthValue[health];
};

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

module.exports = { convertHealthToNumber, convertObjectToSnakeCase };

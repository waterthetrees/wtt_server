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

module.exports = { convertHealthToNumber };

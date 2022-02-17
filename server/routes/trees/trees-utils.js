export const convertHealthToNumber = (health) => {
  if (!health) return 6;

  const healthNumber = {
    good: 6,
    fair: 5,
    poor: 4,
    stump: 3,
    missing: 2,
    dead: 1,
    vacant: 0,
  };

  return healthNumber[health];
};

// https://stackoverflow.com/questions/44082153/javascript-method-for-changing-snake-case-to-pascalcase
export const capEachWord = (str) => {
    str +='';
    str = str.split('_');
    for(var i=0;i<str.length;i++){ 
        str[i] = str[i].slice(0,1).toUpperCase() + str[i].slice(1,str[i].length);
    }
    return str.join(' ');
}

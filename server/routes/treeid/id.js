/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-bitwise */
export const MIN_LAT = -90;
export const MAX_LAT = 90;
export const MIN_LON = -180;
export const MAX_LON = 180;

// This code originally appeared here: 
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript/34842797#34842797

const cyrb53 = (str, seed = 1) => {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
  h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1>>>0);
};

// This code originally appeared here: https://github.com/sunng87/node-geohash/blob/master/main.js#L127-L161
const geohashToInt = (latitude, longitude, bitDepth) => {
  // eslint-disable-next-line no-param-reassign
  bitDepth = bitDepth || 52;

  let bitsTotal = 0;
  let combinedBits = 0;
  let mid = null;
  let maxLat = MAX_LAT;
  let minLat = MIN_LAT;
  let maxLon = MAX_LON;
  let minLon = MIN_LON;

  while (bitsTotal < bitDepth) {
    combinedBits *= 2;
    if (bitsTotal % 2 === 0) {
      mid = (maxLon + minLon) / 2;
      if (longitude > mid) {
        combinedBits += 1;
        minLon = mid;
      } else {
        maxLon = mid;
      }
    } else {
      mid = (maxLat + minLat) / 2;
      if (latitude > mid) {
        combinedBits += 1;
        minLat = mid;
      } else {
        maxLat = mid;
      }
    }
    bitsTotal++;
  }
  return combinedBits;
};


// To fixed 8 decimal places
const truncateTo = (unRouned, nrOfDecimals = 8) => {
  const parts = String(unRouned).split(".");
  if (parts.length !== 2) {
      // without any decimal part
    return unRouned;
  }
  const newDecimals = parts[1].slice(0, nrOfDecimals);
  const newString = `${parts[0]}.${newDecimals}`;

  return Number(newString);
};

export const createIdForTree = (data) => {
  const { common, lng, lat, scientific, city } = data;
  const latitude = truncateTo(lat,8);
  const longitude = truncateTo(lng,8);
  const hashed = geohashToInt(latitude, longitude, 52);
  const cityState = data?.state ? `${city.toLowerCase()}_${data?.state.toLowerCase()}` : city.toLowerCase();
  const idString = `${cityState}-${common}-${scientific}-${hashed}`;
  const id = Math.abs(cyrb53(idString));
  return id;
};
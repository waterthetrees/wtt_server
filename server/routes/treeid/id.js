/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-bitwise */
export const MIN_LAT = -90;
export const MAX_LAT = 90;
export const MIN_LON = -180;
export const MAX_LON = 180;

// export const hashcode = (s) => {
//   let h = 0;
//   let i = s.length;
//   while (i > 0) {
//     h = ((h << 5) - h + s.charCodeAt(--i)) | 0;
//   }
//   return Math.abs(h);
// };

// This code originally appeared here: 
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript/34842797#34842797
// const TSH1=s=>{for(var i=0,h=9;i<s.length;)h=Math.imul(h^s.charCodeAt(i++),9**9);return h^h>>>9}
const TSH=s=>{for(var i=s.length,h=9;i;)h=Math.imul(h^s.charCodeAt(--i),9**9);return h^h>>>9}

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

/* ALERT ALERT If you change anything here, change it in wtt_area id.js as well!!! */

export const createIdForTree = (data) => {
  const { common, lng, lat, scientific, city } = data;

  const hashed = geohashToInt(lat.toFixed(7), lng.toFixed(7), 52);
  const cityState = data?.state ? `${city.toLowerCase()}_${data?.state.toLowerCase()}` : city.toLowerCase(); ;
  const idString = `${cityState}-${common}-${scientific}-${hashed}`;
  const id = Math.abs(TSH(idString));
  return id;
};
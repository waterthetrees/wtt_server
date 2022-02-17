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

const formatStrings = (d) => {
  const citySource = (d.sourceID || d.city || 'unknown').toLowerCase().replaceAll(' ', '_');
  return {
    common: d.common ? `-${d.common.toLowerCase()}` : '',
    scientific: d.scientific ? `-${d.scientific.toLowerCase()}` : '',
    cityState: d.state ? `${citySource}_${d.state.toLowerCase()}` : citySource,
    lat: truncateTo(d.lat,8),
    lng: truncateTo(d.lng,8),
  };
}

export const createIdForTree = (data) => {
  const { common, lng, lat, scientific, cityState } = formatStrings(data);
  const hashed = geohashToInt(lat, lng, 52);

  const idString = `${cityState}${common}${scientific}-${hashed}`;
  // console.log(idString, 'idString');
  const id = Math.abs(cyrb53(idString));
  // console.log(id, 'id');
  return id;
};

function testFindAndReplaceTreeIds() {
  const data = [
    ['alameda', 'WATER GUM','Tristaniopsis laurina', -122.2805283,37.77269597],
    // ['Oakland','California','Dracaena, Giant','Cordyline australis',-122.2987539, 37.80969809 ],
    // ['Oakland','CA','Oak, Coastal/ California Live','Quercus agrifolia',-122.2705264,37.79770322],
    // ['Alameda','CA','MAIDENHAIRTREE','Ginkgobiloba',-122.2260514,37.75744973],
    // ['Alameda','CA','ASPHALTED WELL','Asphalted well',-122.2654197,37.76083234],
    // ['San Francisco', 'CA', 'Lemon Bottlebrush', 'Callistemon citrinus', -122.39180689548819, 37.73816558097692],
    // ['San Francisco', 'CA', 'Lemon Bottlebrush', 'Callistemon citrinus', -122.39180445292185, 37.7381657644348]
  ];
  
  const ids = data.map(async d => {
    const params = {
       sourceID: d[0],
       common: d[1],
       scientific: d[2],
       lat: Number(d[3]),
       lng: Number(d[4]),
     }
     console.log('params', params);
    const id = createIdForTree(params);
    console.log('ids', id);
    return id;
   });
  
}

testFindAndReplaceTreeIds();
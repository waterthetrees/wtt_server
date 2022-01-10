const axios = require('axios');
const faker = require('faker');
const nock = require('nock');

let axiosAPIClient;

beforeAll(() => {
  const axiosConfig = {
    baseURL: 'http://127.0.0.1:3002/api',
    validateStatus: () => true,
  };

  axiosAPIClient = axios.create(axiosConfig);

  // Only allow requests to localhost
  nock.disableNetConnect();
  nock.enableNetConnect('127.0.0.1');
});

afterEach(() => {
  // Remove all interceptors
  nock.cleanAll();
});

afterAll(() => {
  // Re-enable requests to all hosts
  nock.enableNetConnect();
});

describe('/api/treemap', () => {
  describe('GET', () => {
    describe('When a new tree is created', () => {
      test('Then the tree cached as GeoJSON', async () => {
        /** Arrange */
        const newTreeData = {
          city: faker.fake(
            '{{address.cityPrefix}} {{address.cityName}}{{address.citySuffix}}'
          ),
          common: faker.animal.dog(),
          datePlanted: new Date(),
          lat: Number(faker.address.latitude()),
          lng: Number(faker.address.longitude()),
        };

        const newTree = await axiosAPIClient.post('/trees', newTreeData);

        /** Act */
        const params = { city: '%' };

        const treemap = await axiosAPIClient.get('/treemap', {
          params,
        });

        /** Assert */
        expect(treemap).toEqual(
          expect.objectContaining({
            status: 200,
            data: expect.objectContaining({
              type: 'FeatureCollection',
              features: expect.arrayContaining([
                {
                  id: 'treedata',
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [newTree.data.lng, newTree.data.lat],
                  },
                  properties: {
                    id: newTree.data.id,
                    common: newTree.data.common,
                    health: null,
                  },
                },
              ]),
            }),
          })
        );
      });
    });
  });
});

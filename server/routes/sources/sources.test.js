import axios from 'axios';
import faker from 'faker';
import nock from 'nock';

let axiosAPIClient;

beforeAll(() => {
  const port = '3004' || '3002';
  const axiosConfig = {
    baseURL: `http://127.0.0.1:${port}/api`,
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

describe('/api/sources', () => {
  describe('GET', () => {
    describe('When sources is specified by idSourceName', () => {
      test('Then confirm the source is returned', async () => {
        /** Arrange */
        const body = {
          source: {
            idSourceName: faker.name.findName(),
            city: faker.address.cityName(),
            state: faker.address.stateAbbr(),
            country: faker.address.country(),
            isoAlpha2: faker.address.countryCode('alpha-2'), // 'GA'
            isoAlpha3: faker.address.countryCode('alpha-3'), // 'TJK'
            latitude: Number(faker.address.latitude()),
            longitude: Number(faker.address.longitude()),
          },
          crosswalk: {
            common: faker.animal.dog(),
            scientific: faker.animal.cat(),
            species: faker.animal.cat(),
          },
        };
        const { data: sourceResponse } = await axiosAPIClient.post(
          '/sources',
          body,
        );

        /** Act */
        const params = {
          idSourceName:
            sourceResponse?.source?.idSourceName ?? body?.source?.idSourceName,
        };
        console.log('params FAILING HERE', params);
        const response = await axiosAPIClient.get('/sources', {
          params,
        });
        console.log('response DOESNT REACH HERE', response);

        /** Assert */
        // expect(response.status).toBe(200);
        expect(response).toMatchObject({
          status: 200,
          data: {
            country: body.source.country,
            city: body.source.city,
            idSourceName: body.source.idSourceName,
          },
        });
      });
    });
  });
});

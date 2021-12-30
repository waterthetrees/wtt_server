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

describe('/api/trees/:id', () => {
  describe('GET', () => {
    describe('When the tree exists', () => {
      test('Then returns the tree data and a 200 status code', async () => {
        /** Arrange */
        const body = {
          common: faker.animal.dog(),
          datePlanted: new Date(),
          lat: Number(faker.address.latitude()),
          lng: Number(faker.address.longitude()),
        };

        const {
          data: { id },
        } = await axiosAPIClient.post('/trees', body);

        /** Act */
        const params = {
          id,
        };

        const newTree = await axiosAPIClient.get('/trees', {
          params,
        });

        /** Assert */
        expect(newTree).toMatchObject({
          status: 200,
          data: {
            id,
            common: body.common,
            scientific: body.scientific ?? null,
            genus: body.genus ?? null,
            datePlanted: body.datePlanted.toJSON(),
            health: body.health ?? null,
            healthNum: expect.any(Number),
            address: body.address ?? null,
            city: body.city ?? null,
            country: body.country ?? null,
            zip: body.zip ?? null,
            neighborhood: body.neighborhood ?? null,
            lat: body.lat,
            lng: body.lng,
            owner: body.owner ?? null,
            dbh: body.dbh ?? null,
            height: body.height ?? null,
            idReference: body.idReference ?? null,
            who: body.who ?? null,
            notes: body.notes ?? null,
          },
        });
      });
    });

    describe('When the tree does not exist', () => {
      test('Then return a 404 status code', async () => {
        /** Arrange */
        const params = { id: 0 };

        /** Act */
        const tree = await axiosAPIClient.get('/trees', {
          params,
        });

        /** Assert */
        expect(tree).toMatchObject({
          status: 404,
          data: {
            error: 'No data returned from the query.',
          },
        });
      });
    });
  });

  describe('POST', () => {
    describe('When given all required inputs', () => {
      describe('When given a new city', () => {
        test('Then create a new tree', async () => {
          /** Arrange */
          // TODO: determine required inputs when adding a tree
          const body = {
            city: faker.fake(
              '{{address.cityPrefix}} {{address.cityName}}{{address.citySuffix}}'
            ),
            common: faker.animal.dog(),
            datePlanted: new Date(),
            lat: Number(faker.address.latitude()),
            lng: Number(faker.address.longitude()),
          };

          /** Act */
          const newTree = await axiosAPIClient.post('/trees', body);

          /** Assert */
          expect(newTree).toMatchObject({
            status: 201,
            data: {
              id: expect.any(Number),
              common: body.common,
              scientific: body.scientific ?? null,
              genus: body.genus ?? null,
              dateVisit: body.datePlanted.toJSON(),
              health: body.health ?? null,
              address: body.address ?? null,
              city: body.city,
              country: body.country ?? null,
              zip: body.zip ?? null,
              neighborhood: body.neighborhood ?? null,
              lat: body.lat,
              lng: body.lng,
              owner: body.owner ?? null,
              dbh: body.dbh ?? null,
              height: body.height ?? null,
              idReference: body.idReference ?? null,
              who: body.who ?? null,
              notes: body.notes ?? null,
            },
          });
        });

        test("Then create the new city and update it's tree count", async () => {
          /** Arrange */
          const body = {
            city: faker.fake(
              '{{address.cityPrefix}} {{address.cityName}}{{address.citySuffix}}'
            ),
            common: faker.animal.dog(),
            datePlanted: new Date(),
            lat: Number(faker.address.latitude()),
            lng: Number(faker.address.longitude()),
          };

          const newTree = await axiosAPIClient.post('/trees', body);

          /** Act */
          const newCity = await axiosAPIClient.get('/cities', {
            params: {
              city: newTree.data.city,
            },
          });

          /** Assert */
          expect(newCity).toMatchObject({
            status: 200,
            data: {
              city: body.city,
              cityCountTrees: 1,
              country: body.country ?? null,
              lat: body.lat,
              lng: body.lng,
            },
          });
        });

        test("Then initialize the new tree's history", async () => {
          /** Arrange */
          const body = {
            city: faker.fake(
              '{{address.cityPrefix}} {{address.cityName}}{{address.citySuffix}}'
            ),
            common: faker.animal.dog(),
            datePlanted: new Date(),
            lat: Number(faker.address.latitude()),
            lng: Number(faker.address.longitude()),
            // volunteer: faker.name.findName(), // TODO: volunteer will never end up in treehistory on tree creation
          };

          const {
            data: { id },
          } = await axiosAPIClient.post('/trees', body);

          /** Act */
          const newTreeHistory = await axiosAPIClient.get('/treehistory', {
            params: { id },
          });

          /** Assert */
          expect(newTreeHistory).toMatchObject({
            status: 200,
            data: [
              {
                adopted: null,
                braced: null,
                comment: `THIS ${body.common.toUpperCase()} IS PLANTED!!!`,
                dateVisit: body.datePlanted.toJSON(),
                id,
                idhistory: expect.any(Number),
                liked: null,
                mulched: null,
                pruned: null,
                staked: null,
                volunteer: body.volunteer ?? null,
                watered: null,
                weeded: null,
              },
            ],
          });
        });
      });
    });

    describe('When missing required inputs', () => {
      test('Then returns an error message and a 400 status code', async () => {
        /** Arrange */
        const body = {};

        /** Act */
        const newTree = await axiosAPIClient.post('/trees', body);

        /** Assert */
        expect(newTree).toMatchObject({
          status: 400,
          data: {
            error: 'Missing required parameter(s).',
          },
        });
      });
    });
  });

  describe('PUT', () => {
    describe('When given valid inputs', () => {
      test('Then update the tree', async () => {
        /** Arrange */
        const body = {
          city: faker.fake(
            '{{address.cityPrefix}} {{address.cityName}}{{address.citySuffix}}'
          ),
          common: faker.animal.dog(),
          datePlanted: new Date(),
          lat: Number(faker.address.latitude()),
          lng: Number(faker.address.longitude()),
        };

        const tree = await axiosAPIClient.post('/trees', body);

        const updatedTreeBody = {
          id: tree.data.id,
          common: faker.animal.dog(),
          genus: faker.lorem.word(),
          scientific: faker.lorem.words(),
        };

        /** Act */
        const updatedTree = await axiosAPIClient.put('/trees', updatedTreeBody);

        /** Assert */
        expect(updatedTree).toMatchObject({
          status: 200,
          data: updatedTreeBody,
        });
      });
    });
  });
});

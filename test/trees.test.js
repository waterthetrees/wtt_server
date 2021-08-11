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

afterAll(() => {
  // Remove all interceptors
  nock.cleanAll();

  // Re-enable requests to all hosts
  nock.enableNetConnect();
});

describe('/api/trees/:id', () => {
  describe('GET', () => {
    describe('When the tree exists', () => {
      test('Then returns the correct data and a 200 status code', async () => {
        /** Arrange */
        const body = {
          common: faker.animal.dog(),
          datePlanted: new Date(),
          lat: Number(faker.address.latitude()),
          lng: Number(faker.address.longitude()),
        };

        const {
          data: { idTree },
        } = await axiosAPIClient.post('/tree', body);

        /** Act */
        const newTree = await axiosAPIClient.get('/tree', {
          params: { currentTreeId: idTree },
        });

        /** Assert */
        expect(newTree).toMatchObject({
          status: 200,
          data: {
            idTree,
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
        const params = { currentTreeId: 0 };

        /** Act */
        const tree = await axiosAPIClient.get('/tree', {
          params,
        });

        /** Assert */
        expect(tree.status).toBe(404);
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
          const newTree = await axiosAPIClient.post('/tree', body);

          /** Assert */
          expect(newTree).toMatchObject({
            status: 201,
            data: {
              idTree: expect.any(Number),
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

        test('Then create the new city', async () => {
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

          const newTree = await axiosAPIClient.post('/tree', body);

          /** Act */
          const newCity = await axiosAPIClient.get('/cities', {
            params: {
              city: newTree.data.city,
            },
          });

          /** Assert */
          expect(newCity).toMatchObject({
            status: 200,
            data: [
              {
                city: body.city,
                cityCountTrees: 1,
                country: body.country ?? null,
                lat: body.lat,
                lng: body.lng,
              },
            ],
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
            data: { idTree },
          } = await axiosAPIClient.post('/tree', body);

          /** Act */
          const { status, data } = await axiosAPIClient.get('/treehistory', {
            params: { currentTreeId: idTree },
          });

          /** Assert */
          expect({ status, data }).toMatchObject({
            status: 200,
            data: [
              {
                adopted: null,
                braced: null,
                comment: `THIS ${body.common.toUpperCase()} IS PLANTED!!!`,
                dateVisit: body.datePlanted.toJSON(),
                idTree,
                idTreeHistory: expect.any(Number),
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
      test('Then returns a 400 status code', async () => {
        /** Arrange */
        const body = {};

        /** Act */
        const newTree = await axiosAPIClient.post('/tree', body);

        /** Assert */
        expect(newTree.status).toBe(400);
      });
    });
  });
});

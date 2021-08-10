const axios = require('axios');
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
          common: 'Fake Common Name',
          datePlanted: new Date(),
          lat: Math.random() * 100,
          lng: Math.random() * 100,
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
            lat: body.lat ?? null,
            lng: body.lng ?? null,
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
    // describe('When given valid inputs', () => {
    //   test('Then return the correct data and a 201 status code', async () => {
    //     /** Arrange */
    //     // TODO: determine required inputs when adding a tree
    //     const body = {
    //       common: 'Fake Common Name',
    //       datePlanted: new Date(),
    //       lat: Math.random() * 100,
    //       lng: Math.random() * 100,
    //     };

    //     /** Act */
    //     const newTree = await axiosAPIClient.post('/tree', body);

    //     /** Assert */
    //     expect(newTree).toMatchObject({
    //       status: 201,
    //       data: {
    //         // TODO: determine what to return on db insert
    //         idTree: expect.any(Number),
    //         common: body.common,
    //         dateVisit: body.datePlanted.toJSON(),
    //       },
    //     });
    //   });
    // });

    describe('When missing required inputs', () => {
      test.todo('Then returns a 400 status code');
    });
  });

  // describe('PATCH', () => {});
  // describe('DELETE', () => {});
});

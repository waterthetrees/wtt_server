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

describe('/trees/:id', () => {
  describe('/adoptions', () => {
    describe('GET', () => {
      describe('when valid tree and valid user', () => {
        // test.todo('then should receive the correct total number of likes');

        describe('when the user has not adopted the tree', () => {
          test('then should confirm the user has not adopted the tree', async () => {
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

            const tree = await axiosAPIClient.post('/tree', body);

            /** Act */
            const params = {
              idTree: tree.data.idTree,
              email: faker.internet.email(),
              request: 'adopted',
            };

            const treeLikes = await axiosAPIClient.get('/treeadoptions', {
              params,
            });

            /** Assert */
            expect(treeLikes).toMatchObject({
              status: 200,
              data: {
                adopted: false,
                adoptedCount: 0,
              },
            });
          });
        });

        //   describe('when the user has adopted the tree', () => {
        //     test('then should confirm the user has adopted the tree', async () => {});
        //   });
      });

      describe('when invalid tree', () => {
        test.todo('then should return 404 response');
      });
    });

    describe('POST', () => {
      describe('When given valid input', () => {
        test('Then like the tree', async () => {
          /** Arrange */

          // Create a tree
          const body = {
            city: faker.fake(
              '{{address.cityPrefix}} {{address.cityName}}{{address.citySuffix}}'
            ),
            common: faker.animal.dog(),
            datePlanted: new Date(),
            lat: Number(faker.address.latitude()),
            lng: Number(faker.address.longitude()),
          };

          const tree = await axiosAPIClient.post('/tree', body);

          // Adopt the tree
          const treeUserBody = {
            idTree: tree.data.idTree,
            email: faker.internet.email(),
            common: tree.data.common,
            nickname: faker.name.findName(),
            request: {
              name: 'adopted',
              type: 'POST',
            },
          };

          const adoptedTree = await axiosAPIClient.post(
            '/treeadoptions',
            treeUserBody
          );

          /** Act */
          const params = {
            idTree: adoptedTree.data.idTree,
            email: treeUserBody.email,
            request: 'adopted',
          };

          const treeAdoptions = await axiosAPIClient.get('/treeadoptions', {
            params,
          });

          /** Assert */
          expect(treeAdoptions).toMatchObject({
            status: 200,
            data: {
              adopted: true,
              adoptedCount: 1,
            },
          });
        });
      });
    });

    describe('DELETE', () => {
      describe('When given valid input', () => {
        test('Then unadopt the tree', async () => {
          /** Arrange */

          // Create a tree
          const body = {
            city: faker.fake(
              '{{address.cityPrefix}} {{address.cityName}}{{address.citySuffix}}'
            ),
            common: faker.animal.dog(),
            datePlanted: new Date(),
            lat: Number(faker.address.latitude()),
            lng: Number(faker.address.longitude()),
          };

          const tree = await axiosAPIClient.post('/tree', body);

          // Like the tree
          const treeUserBody = {
            idTree: tree.data.idTree,
            email: faker.internet.email(),
            common: tree.data.common,
            nickname: faker.name.findName(),
            request: {
              name: 'liked',
              type: 'POST',
            },
          };

          const adoptedTree = await axiosAPIClient.post(
            '/treeadoptions',
            treeUserBody
          );

          /** Act */
          const unAdoptedTreeBody = {
            ...treeUserBody,
            request: {
              name: 'liked',
              type: 'DELETE',
            },
          };

          const unAdoptedTree = await axiosAPIClient.post(
            '/treeadoptions',
            unAdoptedTreeBody
          );

          /** Assert */
          expect(unAdoptedTree).toMatchObject({
            status: 200,
            data: {
              success: true,
            },
          });
        });
      });
    });
  });
});

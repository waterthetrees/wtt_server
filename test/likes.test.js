const axios = require('axios');
const nock = require('nock');

const baseURL = 'http://127.0.0.1:3002';
let axiosAPIClient;

const handleRequestFailure = (res) => {
  const error = new Error(res);

  error.stack = error.stack
    .split('\n')
    .filter(
      (line) =>
        !line.includes('at handleRequestFailure') &&
        !line.includes('at processTicksAndRejections')
    )
    .join('\n');

  return Promise.reject(error);
};

beforeAll(() => {
  const axiosConfig = {
    baseURL,
    validateStatus: () => true,
  };

  axiosAPIClient = axios.create(axiosConfig);

  axiosAPIClient.interceptors.response.use(
    (result) => result,
    handleRequestFailure
  );

  nock.disableNetConnect();
  nock.enableNetConnect('127.0.0.1');
});

afterAll(() => {
  nock.enableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

describe('/trees/:id', () => {
  describe('/likes', () => {
    describe('GET', () => {
      describe('when valid tree and valid user', () => {
        test.todo('then should receive the correct total number of likes');

        // describe('when the user has not liked the tree', () => {
        //     test('then should confirm the user has not liked the tree', async () => {
        //       /** Arrange */
        //       // mock create a tree
        //       const getTreeQuery = { currentTreeId: 99 };
        //       nock('http://localhost/api')
        //         .get('/tree')
        //         .query(getTreeQuery)
        //         .reply(200, { idTree: getTreeQuery.currentTreeId });
        //       // get the mocked tree
        //       const {
        //         data: { idTree },
        //       } = await axiosAPIClient.get('/api/tree', {
        //         params: getTreeQuery,
        //       });
        //       const query = {
        //         idTree,
        //         email: 'test@test.com', // TODO: remove if user doesn't need to be logged in to view likes count
        //         request: 'liked', // TODO: split likes and adoptions into separate routes
        //       };
        //       /** Act */
        //       const response = await axiosAPIClient.get('/api/treeuser', {
        //         params: query,
        //       });
        //       /** Assert */
        //       expect(response).toMatchObject({
        //         status: 200,
        //         data: {
        //           liked: false,
        //           likedCount: 0,
        //         },
        //       });
        //     });
        //   });

        //   describe('when the user has liked the tree', () => {
        //     test('then should confirm the user has liked the tree', async () => {});
        //   });
      });

      describe('when invalid tree', () => {
        test.todo('then should return 404 response');
      });

      describe('when invalid user', () => {
        test.todo('then should return 404 response');
      });
    });
  });
});

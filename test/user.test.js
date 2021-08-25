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

describe('/api/user', () => {
  describe('GET', () => {
    describe('When given an existing user', () => {
      test('Then return the user', async () => {
        /** Arrange */
        const body = {
          nickname: faker.internet.userName(),
          name: faker.name.findName(),
          picture: faker.random.image(),
          email: faker.internet.email(),
        };

        const newUser = await axiosAPIClient.post('/user', body);

        /** Act */
        const params = { email: newUser.data.email };

        const user = await axiosAPIClient.get('/user', {
          params,
        });

        /** Assert */
        expect(user).toMatchObject({
          status: 200,
          data: {
            nickname: body.nickname,
            name: body.name,
            email: body.email,
            idUser: expect.any(Number),
          },
        });
      });
    });

    describe('When given a non-existent user', () => {
      test('Then return 404 error', async () => {
        /** Arrane */
        const params = { email: faker.internet.email() };

        /** Act */
        const user = await axiosAPIClient.get('/user', { params });

        /** Assert */
        expect(user).toMatchObject({
          status: 404,
          data: {
            error: 'Failed to find user.',
          },
        });
      });
    });
  });

  describe('POST', () => {
    describe('When given a new user', () => {
      test('Then add the user to the database', async () => {
        /** Arrange */
        const body = {
          nickname: faker.internet.userName(),
          name: faker.name.findName(),
          picture: faker.random.image(),
          email: faker.internet.email(),
        };

        /** Act */
        const user = await axiosAPIClient.post('/user', body);

        /** Assert */
        expect(user).toMatchObject({
          status: 201,
          data: {
            nickname: body.nickname,
            name: body.name,
            email: body.email,
            idUser: expect.any(Number),
          },
        });
      });
    });

    describe('When given an existing user', () => {
      test('Then return the existing user', async () => {
        /** Arrange */
        const body = {
          nickname: faker.internet.userName(),
          name: faker.name.findName(),
          picture: faker.random.image(),
          email: faker.internet.email(),
        };

        const newUser = await axiosAPIClient.post('/user', body);

        /** Act */
        const params = { email: newUser.data.email };

        const user = await axiosAPIClient.get('/user', { params });

        /** Assert */
        expect(user).toMatchObject({
          status: 200,
          data: {
            nickname: body.nickname,
            name: body.name,
            email: body.email,
            idUser: newUser.data.idUser,
          },
        });
      });
    });
  });
});

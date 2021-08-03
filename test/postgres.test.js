const db = require('./lib/database');

beforeAll(() => {
});

afterAll(async () => {
  await db.end();
});

describe('testing postgres', () => {
  it('connects to the test database', async () => {
    const { rowCount } = await db.query('SELECT now()');

    expect(rowCount).toBe(1);
  });
});

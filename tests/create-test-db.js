function createTestDatabase() {
  const query = `CREATE DATABASE ${testdb} WITH TEMPLATE ${originalDb} OWNER ${user};`;
}

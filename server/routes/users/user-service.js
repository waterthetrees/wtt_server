import userQueries from './user-queries.js';

export const createUser = (repository) => (email, name, nickname, picture) => {
  return repository.createUser(email, name, nickname, picture);
};

export const getUser = (repository) => (email) => {
  return repository.getUser(email);
};

export const buildUserService = (repository) => ({
  createUser: createUser(repository),
  getUser: getUser(repository),
});

export default buildUserService(userQueries);
// export default buildUserService(import('./user-queries.js'));

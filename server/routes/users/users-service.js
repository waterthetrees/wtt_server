export const buildUsersService = ({ usersRepository }) => {
  return {
    async getUser({ userDTO: { email } }) {
      // validate business logic of email
      return usersRepository.findUser({ email });
    },
    async createUser({ userDTO }) {
      // validate business logic of userDTO fields
      return usersRepository.createUser({ user: userDTO });
    },
  };
};

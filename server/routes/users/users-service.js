export const buildUsersService = ({ usersRepository }) => {
  return {
    async getUser({ userDTO: { email } }) {
      // validate business logic here
      // check if userDTO.email is an email
      // if not, throw error?
      return usersRepository.findUser({ email });
    },
    async createUser({ userDTO }) {
      // validate business logic here
      // add check that the fields in userDTO are valid to add to the database
      // this will help prevent irregular data from sneaking into our database
      return usersRepository.createUser({ user: userDTO });
    },
  };
};

import AppError from '../../errors/AppError.js';

export function buildUsersController({ usersService }) {
  return {
    async getRequestHandler(httpRequest) {
      const { userDTO } = buildGetRequestUserDTO(httpRequest);
      const user = await usersService.getUser({ userDTO });

      if (!user) {
        throw new AppError(404, 'Failed to find user.');
      }

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
        json: user,
      };
    },
    async postRequestHandler(httpRequest) {
      const { userDTO } = buildPostRequestUserDTO(httpRequest);
      const user = await usersService.getUser({ userDTO });

      if (user) {
        return {
          headers: {
            'Content-Type': 'application/json',
          },
          status: 200,
          json: user,
        };
      }

      const newUser = await usersService.createUser({ userDTO });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 201,
        json: newUser,
      };
    },
  };

  function buildGetRequestUserDTO({ query: { email } }) {
    // maybe do these existence validations in a middleware
    if (!email) {
      throw new AppError(400, 'Missing required parameter: email.');
    }

    return {
      userDTO: {
        email,
      },
    };
  }

  function buildPostRequestUserDTO({ body: { email, name, nickname } }) {
    // maybe do these existence validations in a middleware
    if (!email) {
      throw new AppError(400, 'Missing required parameter: email.');
    }

    if (!name) {
      throw new AppError(400, 'Missing required parameter: name.');
    }

    if (!nickname) {
      throw new AppError(400, 'Missing required parameter: nickname.');
    }

    return {
      userDTO: {
        email,
        name,
        nickname,
      },
    };
  }
}

import AppError from '../../errors/AppError.js';
import uService from './user-service.js';

// const getRequestHandler = (userService) => async (httpRequest) => {
//   const { userDTO } = buildGetRequestUserDTO(httpRequest);
//   const user = await userService.getUser(userDTO.email);

//   if (!user) {
//     throw new AppError(404, 'Failed to find user.');
//   }

//   return {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     status: 200,
//     json: user,
//   };
// };

// function buildGetRequestUserDTO({ query: { email } }) {
//   if (!email) {
//     throw new AppError(400, 'Missing required parameter: email.');
//   }

//   return {
//     userDTO: {
//       email,
//     },
//   };
// }

// const postRequestHandler = (userService) => async (httpRequest) => {
//   const { userDTO } = buildPostRequestUserDTO(httpRequest);
//   const user = await userService.getUser(userDTO.email);

//   if (user) {
//     return {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       status: 200,
//       json: user,
//     };
//   }

//   const newUser = await userService.createUser(
//     userDTO.email,
//     userDTO.name,
//     userDTO.nickname,
//   );
//   return {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     status: 201,
//     json: newUser,
//   };
// };

// function buildPostRequestUserDTO({ body: { email, name, nickname } }) {
//   if (!email) {
//     throw new AppError(400, 'Missing required parameter: email.');
//   }

//   if (!name) {
//     throw new AppError(400, 'Missing required parameter: name.');
//   }

//   if (!nickname) {
//     throw new AppError(400, 'Missing required parameter: nickname.');
//   }

//   return {
//     userDTO: {
//       email,
//       name,
//       nickname,
//     },
//   };
// }

const post = (userService) => async (req, res) => {
  const { email, name, nickname } = req.body;

  // if (!email || !name || !nickname) {
  //   res.status(400).end();
  //   return;
  // }

  // const user = await userService.getUser(email);

  // if (user) {
  //   res.status(200).json(user);
  //   return;
  // }

  const newUser = await userService.createUser(email, name, nickname);
  res.status(201).json(newUser);
};

const get = (userService) => async (req, res) => {
  const { email } = req.query;
  const user = await userService.getUser(email);

  if (!user) {
    throw new AppError(404, 'Failed to find user.');
  }

  res.status(200).json(user);
};

export const buildUserController = (userService) => ({
  // getRequestHandler: getRequestHandler(userService),
  // postRequestHandler: postRequestHandler(userService),
  post: post(userService),
  get: get(userService),
});

export default buildUserController(uService);
// export default buildUserController(await import('./user-service.js'));

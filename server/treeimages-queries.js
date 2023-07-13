import { db, pgPromise } from '../../db/index.js';

import {
  convertObjectKeysToSnakeCase,
  convertObjectKeysToCamelCase,
} from '../shared-routes-utils.js';

const TREEIMAGES_FIELDS = `id_image as "idImage", 
    id_image,
    image_description,
    image_url,
    image_filename,
    photographer,
    image_type,
    image_number
    `;


export async function createImage(data) {
  // eslint-disable-next-line no-unused-vars
  const {imagesTBD} = data;

  const dataInSnakeCase = convertObjectKeysToSnakeCase(source);

  const query = `
      INSERT INTO tree_images(\${this:name})
      VALUES(\${this:csv})
      RETURNING image_url as "imageUrl"
    `;

  const response = await db.one(query, dataInSnakeCase);
  return response;
}

export async function deleteImage({image_number,id,image_filename}){
const query =`
DELETE FROM tree_images
WHERE id = $1 AND images_number = $2 AND IMAGE_FILENAME = $3;
`;
  
const values = [image_number,id,image_filename];
const results = db
.result(query, values)
.then((data) => data)
.catch((error) => error);

return results; 
}

export async function getAllImages() {
  const query = {
    name: 'find-images',
    text: `SELECT ${TREEIMAGES_FIELDS} FROM tree_images;`,
  };
  const image = await db.any(query);
  return image;
}

export async function getImageById(image_number,id,image_filename) {
  const query = {
    name: 'find-image',
    text: `SELECT ${TREEIMAGES_FIELDS} 
      FROM tree_images 
      WHERE id = $1 AND image_number = $2 AND image_filename = $3`,
    values: [id,image_number,image_filename]
  };

  const image = await db.one(query);
  return image;
}

// export async function updateSourceByIdSourceName(data) {
//   const dataInSnakeCase = convertObjectKeysToSnakeCase(data);
//   const keys = Object.keys(dataInSnakeCase);
//   const keysString = keys.join(', ');

//   const condition = pgPromise.as.format(
//     ` WHERE id_source_name = '${data.idSourceName}' 
//       RETURNING ${keysString};`,
//   );
//   const query =
//     pgPromise.helpers.update(dataInSnakeCase, keys, 'sources') + condition;
//   const updatedResponse = await db.one(query, dataInSnakeCase);
//   const camelCaseResponse = convertObjectKeysToCamelCase(await updatedResponse);
//   return camelCaseResponse;
// }
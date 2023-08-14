import express from 'express';
import AppError from '../../errors/AppError.js';
import {
  createImage,
  getAllImages,
  getImageById,
} from './treeimages-queries.js';
import { validateImage } from './treeimages-validations.js';

const treeimagesRouter = express.Router();

//TODO change URL
treeimagesRouter.get('/', async (req, res) => {
  const { idImage, id } = req.query;

  if (idImage && id) {
    const responseImage = await getImageById(idImage && id);
    if (!responseImage || !id) throw new AppError(400, 'Error getting Image');
    res.status(200).json({ tree_images: responseImage });
    return;
  }

  let foundImages = await getAllImages();
  if (!foundImages || foundImages.length === 0)
    throw new AppError(400, 'Error getting Images');
  res.status(200).json(foundImages);
});

treeimagesRouter.post('/', async (req, res) => {
  const treeimages = req?.body;
  const validated = validateImage(treeimages);
  if (!validated) throw new AppError(400, 'Error validating images');

  const postImage = await createImage(treeimages);
  if (!postImage) throw new AppError(400, 'Error creating image');

  const response = { source: postImage };
  res.status(200).json(response);
});

export default treeimagesRouter;

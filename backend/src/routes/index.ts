import express from 'express';
import { controllers } from '../controllers/index';
const router = express.Router();

router.post('/process', controllers.processYoutubeLink);

export default router

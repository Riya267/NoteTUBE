import express from 'express';
import { controllers } from '../controllers/index';
const router = express.Router();

router.get('/generate', controllers.fetchYoutubeSummary);
router.get('/chat', controllers.chatWithYoutubeVideo);

export default router;

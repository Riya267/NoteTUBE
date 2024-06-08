import httpStatus from 'http-status';
import logger from '../config/logger';
import services from '../services';
import ApiError from '../util/ApiError';
import { type NextFunction, type Request, type Response } from 'express';

interface RequestBodyType {
  youtubeUrl: string;
}

const processYoutubeLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('[Controllers: processYoutubeLink] - controller initiated');
  try {
    const { youtubeUrl } = req.body as RequestBodyType;
    if (!youtubeUrl) {
      const msg = 'youtubeUrl parameter is missing in request body';
      logger.error(`[Controllers: processYoutubeLink] - ${msg}`);
      throw new ApiError(httpStatus.BAD_REQUEST, msg);
    }
    const transcript = await services.generateTranscript(youtubeUrl);
    const generatedNotes = await services.gptService(transcript);
    logger.info(
      `[Controllers: processYoutubeLink] - notes generated successfully`
    );
    const videoId = new URL(youtubeUrl).searchParams.get('v');
    res.json({ notes: `${generatedNotes}`, videoId });
  } catch (error) {
    logger.error(`[Controllers: processYoutubeLink] - ${error?.message}`);
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error?.message));
  }
};

export default processYoutubeLink;

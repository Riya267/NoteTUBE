import httpStatus from 'http-status';
import logger from '../config/logger';
import services from '../services';
import ApiError from '../util/ApiError';
import { type NextFunction, type Request, type Response } from 'express';

interface RequestBodyType {
  prompt: string;
  videoId: string;
}

const chatWithYoutubeVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('[Controllers: chatWithYoutubeVideo] - controller initiated');
  try {
    const { prompt, videoId } = req.query as RequestBodyType;
    if (!prompt || !videoId) {
      const msg = 'videoId or prompt parameter is missing in request body';
      logger.error(`[Controllers: chatWithYoutubeVideo] - ${msg}`);
      throw new ApiError(httpStatus.BAD_REQUEST, msg);
    }
    const transcript = await services.generateTranscript(videoId);
    const responseStream = await services.gptService(transcript, prompt);
    logger.info(
      `[Controllers: chatWithYoutubeVideo] - summary generated successfully`
    );

    let chatResponse = '';

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    for await (const data of responseStream) {
      chatResponse += data.choices[0].delta.content;
      res.write('data:' + JSON.stringify({ chatResponse, videoId }));
      res.write('\n\n');
    }
  } catch (error) {
    logger.error(`[Controllers: chatWithYoutubeVideo] - ${error?.message}`);
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error?.message));
  }
};

export default chatWithYoutubeVideo;

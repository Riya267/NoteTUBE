import httpStatus from 'http-status';
import logger from '../config/logger';
import services from '../services';
import ApiError from '../util/ApiError';
import { type NextFunction, type Request, type Response } from 'express';

interface RequestBodyType {
  videoId: string;
}

const fetchYoutubeSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('[Controllers: fetchYoutubeSummary] - controller initiated');
  try {
    const { videoId } = req.query as RequestBodyType;
    if (!videoId) {
      const msg = 'videoId parameter is missing in request body';
      logger.error(`[Controllers: fetchYoutubeSummary] - ${msg}`);
      throw new ApiError(httpStatus.BAD_REQUEST, msg);
    }
    const transcript = await services.generateTranscript(videoId);
    const responseStream = await services.gptService(transcript);
    logger.info(
      `[Controllers: fetchYoutubeSummary] - summary generated successfully`
    );

    let summary = '';

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    for await (const data of responseStream) {
      summary += data.choices[0].delta.content;
      res.write('data:' + JSON.stringify({ summary, videoId }));
      res.write('\n\n');
    }
  } catch (error) {
    logger.error(`[Controllers: fetchYoutubeSummary] - ${error?.message}`);
    next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error?.message));
  }
};

export default fetchYoutubeSummary;

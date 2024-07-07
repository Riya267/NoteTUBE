import { YoutubeTranscript } from 'youtube-transcript';
import ApiError from '../util/ApiError';
import httpStatus from 'http-status';
import logger from '../config/logger';
import constants from '../constants';

const generateTranscript = async (videoId: string) => {
  const errorMsg = 'transcript not fetched successfully';
  try {
    const youtubeUrl = `${constants.YOUTUBE_URL_BASE}${videoId}`;
    const response = await YoutubeTranscript.fetchTranscript(youtubeUrl);
    if (!response) {
      logger.error(`[Services: generateTranscript] - ${errorMsg}`);
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, errorMsg);
    }
    const updatedResponse = response.map((item) => item.text).join(' ');
    logger.info(
      '[Services: generateTranscript] - transcript fetched successfully'
    );
    return updatedResponse;
  } catch (error) {
    logger.error(`[Services: generateTranscript] - ${errorMsg}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, errorMsg);
  }
};

export default generateTranscript;

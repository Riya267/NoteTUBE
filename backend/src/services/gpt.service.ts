import constants from '../constants';
import ApiError from '../util/ApiError';
import httpStatus from 'http-status';
import logger from '../config/logger';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.GPT_KEY!,
  baseURL: process.env.GPT_API_URL!,
});

const gptService = async (transcript: string, prompt?: string) => {
  logger.info('[Services: gptService] - gptService initiated');
  let errorMsg = 'notes not generated successfully';

  try {
    if (!transcript) {
      errorMsg = 'transcript is either undefined, null or empty';
      logger.error(`[Services: gptService] - ${errorMsg}`);
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, errorMsg);
    }
    const constructedUserPrompt = prompt
      ? `${prompt} for this transcript ${transcript}`
      : `${constants.SUMMARY_USER_PROMPT} ${transcript}`;
    const constructedSystemPrompt = prompt
      ? constants.CHAT_SYSTEM_PROMPT
      : constants.SUMMARY_SYSTEM_PROMPT;
    const responseStream = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: constructedSystemPrompt },
        { role: 'user', content: constructedUserPrompt },
      ],
      model: process.env.GPT_MODEL_NAME!,
      stream: true,
    });

    return responseStream;
  } catch (error) {
    logger.error(`[Services: gptService] - ${JSON.stringify(error)}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, errorMsg);
  }
};

export default gptService;

import { GoogleGenerativeAI } from '@google/generative-ai';
import constants from '../constants';
import ApiError from '../util/ApiError';
import httpStatus from 'http-status';
import logger from '../config/logger';
import OpenAI from 'openai';

const api_key = process.env.GPT_KEY!;
const openai = new OpenAI({
  apiKey: api_key,
  baseURL: constants.GPT_API_URL,
});

const gptService = async (transcript: string) => {
  logger.info('[Services: gptService] - gptService initiated');
  let errorMsg = 'notes not generated successfully';
  try {
    if (!transcript) {
      errorMsg = 'transcript is either undefined, null or empty';
      logger.error(`[Services: gptService] - ${errorMsg}`);
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, errorMsg);
    }
    const prompt = `${transcript} ${constants.NOTES_GENERATE_PROMPT}`;

    const generatedNote = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: constants.GPT_MODEL_NAME,
    });

    if (!generatedNote.choices[0].message.content) {
      errorMsg = `notes not generated successfully}`;
      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, errorMsg);
    }
    logger.info('[Services: gptService] - notes generated successfully');
    return generatedNote.choices[0].message.content;
  } catch (error) {
    logger.error(`[Services: gptService] - ${JSON.stringify(error)}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, errorMsg);
  }
};

export default gptService;

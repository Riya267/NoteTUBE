import { GoogleGenerativeAI } from "@google/generative-ai";
import constants from "../constants";
import ApiError from "../util/ApiError";
import httpStatus from "http-status";
import logger from "../config/logger";

const gemini_api_key = process.env.GOOGLE_GEMINI_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
    model: constants.GPT_MODEL_NAME,
    ...geminiConfig,
});

const gptService = async (transcript: string) => {
    logger.info("[Services: gptService] - gptService initiated")
    let errorMsg = "notes not generated successfully";
    try {
        if(!transcript){
            errorMsg = "transcript is either undefined, null or empty"
            logger.error(`[Services: gptService] - ${errorMsg}`)
            throw new ApiError(
              httpStatus.UNPROCESSABLE_ENTITY,
              errorMsg,
            )
        }
        const prompt = `${transcript} ${constants.NOTES_GENERATE_PROMPT}`;
        const result = await geminiModel.generateContent(prompt);
        if(!result?.response){
            errorMsg = "notes not generated successfully";
            logger.error(`[Services: gptService] - ${errorMsg}`);
            throw new ApiError(
                httpStatus.UNPROCESSABLE_ENTITY,
                errorMsg,
            )
        }
        const response = result.response;
        logger.info(`[Services: gptService] - notes generated successfully`);
        return response.text();
    } catch (error) {
        logger.error(`[Services: gptService] - ${errorMsg}`);
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            errorMsg,
        )
    }
};

export default gptService;
import httpStatus from "http-status";
import logger from "../config/logger";
import services from "../services";
import ApiError from "../util/ApiError";
import { NextFunction, Request, Response } from 'express'

type RequestBodyType = {
  youtubeUrl : string
}

const processYoutubeLink = async (req: Request, res: Response, next: NextFunction) => {
  logger.info("[Controllers: processYoutubeLink] - controller initiated")
  try {
    const { youtubeUrl } = req.body as RequestBodyType;
    if(!youtubeUrl){
      const msg = "youtubeUrl parameter is missing in request body"
      logger.error(`[Controllers: processYoutubeLink] - ${msg}`)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        msg,
      )
    }
    const transcript = await services.generateTranscript(youtubeUrl);
    const generatedNotes = await services.gptService(transcript);
    logger.info("[Controllers: processYoutubeLink] - notes generated successfully")
    console.log("test", generatedNotes)
    res.status(200).send({notes: generatedNotes})
  } catch (error) {
    logger.error(`[Controllers: processYoutubeLink] - ${error?.message}`)
    next(new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    ));
  }
};

export default processYoutubeLink;
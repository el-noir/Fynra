import { validationResult } from "express-validator";
import type { ApiResponse } from "../utils/ApiResponse";

export const validateRequest = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response: ApiResponse<null> = {
      statusCode: 400,
      data: null,
      message: "Validation error",
      error: errors.array(),
    };
    return res.status(400).json(response);
  }
  next();
};

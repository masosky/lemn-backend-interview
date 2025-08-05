import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";
import { AppException } from "../exceptions/app.exceptions";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ValidateError) {
    const normalizedErrors: Record<string, string[]> = {};
    for (const key in err.fields) {
      const cleanKey = key.replace(/^requestBody\./, "");
      const message = err.fields[key].message;
      normalizedErrors[cleanKey] = [message];
    }
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: normalizedErrors,
    });
  }

  if (err instanceof AppException) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: (err as any).details,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

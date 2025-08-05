import { Request, Response, NextFunction } from "express";
import DOMPurify from "isomorphic-dompurify";

export const sanitizeInput = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  next();
};

function sanitizeObject(obj: any): any {
  if (typeof obj === "string") {
    return DOMPurify.sanitize(obj.trim());
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  if (obj && typeof obj === "object") {
    const sanitized: any = {};
    for (const key in obj) {
      sanitized[key] = sanitizeObject(obj[key]);
    }
    return sanitized;
  }
  return obj;
}

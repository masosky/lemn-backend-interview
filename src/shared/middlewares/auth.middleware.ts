import jwt from "jsonwebtoken";
import { Request } from "express";
import { AppException } from "../exceptions/app.exceptions";

export async function expressAuthentication(
  request: Request,
  securityName: string,
  _scopes?: string[]
): Promise<AuthenticatedUser> {
  if (securityName !== "jwt") {
    throw new Error("Unsupported security scheme");
  }

  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppException("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthenticatedUser;
    return payload;
  } catch {
    throw new AppException("Invalid token", 401);
  }
}

export interface AuthenticatedUser {
  id: number;
  email: string;
}

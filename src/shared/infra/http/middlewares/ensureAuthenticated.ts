import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { CustomError } from "@shared/errors/CustomError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new CustomError(401, "Token is missing!");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new CustomError(401, "Invalid token");
  }
}

import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { CustomError } from "@shared/errors/CustomError";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new CustomError(403, "User not authorized");
  }
  return next();
}

import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { CustomError } from '../errors/CustomError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  /**
   *  Padrão JWT - Bearer [Token] - info vem dentro do header
   * */
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new CustomError(401, 'Token missing');
  }
  /**
   *  Desestruturar o Token
   * [0] = Bearer
   * [1] = 323434345445 - Token
   * */
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, '57d5917f817ab6f6079c36b0d0339ca1') as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new CustomError(404, 'User does not exist');
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    console.log(err);
    throw new CustomError(401, 'Invalid Token');
  }
}

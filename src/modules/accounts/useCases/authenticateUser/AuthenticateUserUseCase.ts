import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { CustomError } from '../../../../errors/CustomError';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

// Interface de retorno
interface IResponse {
  userExists: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Usuario existe
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new CustomError(401, 'Email or password incorrect!');
    }

    /*
    Verifica se a senha esta correta - 
    comparação com a senha que esta passando no password 
    com a senha cadastrada no banco
    */

    const passwordMatch = await compare(password, userExists.password);
    if (!passwordMatch) {
      throw new CustomError(401, 'Email or password incorrect!');
    }

    // Se usuário e senha corretos então gerar jsonwebtoken -
    const token = sign({}, '57d5917f817ab6f6079c36b0d0339ca1', {
      subject: userExists.id,
      expiresIn: '1d',
    });

    const tokenReturn: IResponse = {
      token,
      userExists: {
        name: userExists.name,
        email: userExists.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };

import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

/**
 *  Adicionar coluna avatar na tabela de users - yarn typeorm migration:create -n AlterUserAddAvatar - 
 * yarn typeorm migration:run
 * 
    Refatorar usuário com coluna Avatar
    Configuração Upload Multer
    Criar regra de negócio do upload 
    Criar Controller
 * 
 */
@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      // deleta antes de sobreescrever e criar novo arquivo avatar
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}
export { UpdateUserAvatarUseCase };

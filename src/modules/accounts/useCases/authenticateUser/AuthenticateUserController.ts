import { Response, Request } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    // console.log(`Chamando authenticateUserUseCase.execute({ senha=${password}, email=${email} })`);
    const token = await authenticateUserUseCase.execute({ password, email });

    return response.status(200).json(token).send();
  }
}
export { AuthenticateUserController };

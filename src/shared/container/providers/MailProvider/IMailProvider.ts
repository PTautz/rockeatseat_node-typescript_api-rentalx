import { IResponseURL } from "./implementations/EtherealMailProvider";

interface IMailProvider {
  sendMail(to: string, subject: string, variables: unknown, path: string): Promise<IResponseURL>;
}

export { IMailProvider };

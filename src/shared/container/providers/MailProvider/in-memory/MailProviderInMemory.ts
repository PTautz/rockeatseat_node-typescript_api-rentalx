import { IMailProvider } from "../IMailProvider";
import { IResponseURL } from "../implementations/EtherealMailProvider";

class MailProviderInMemory implements IMailProvider {
  messages: any[] = [];

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<IResponseURL> {
    this.messages.push({
      to,
      subject,
      variables,
      path,
    });
    const returned = null;
    return returned;
  }
}

export { MailProviderInMemory };

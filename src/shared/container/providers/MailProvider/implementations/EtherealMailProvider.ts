import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

export interface IResponseURL {
  url: string | boolean;
}

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    // fake smtp email
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        this.client = transporter;
      })
      .catch(err => console.error(err));
  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<IResponseURL> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreply@rentx.com.br>",
      subject,
      html: templateHTML,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));

    const urlReturned: IResponseURL = {
      url: nodemailer.getTestMessageUrl(message),
    };

    return urlReturned;
  }
}

export { EtherealMailProvider };

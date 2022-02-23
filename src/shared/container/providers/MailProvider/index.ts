import { container, delay } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
// import { SESMailProvider } from "./implementations/SESMailProvider";

// const mailProvider = {
//   ethereal: container.resolve(EtherealMailProvider),
//   ses: container.resolve(SESMailProvider),
// };

// container.registerInstance<IMailProvider>("MailProvider", mailProvider[process.env.MAIL_PROVIDER]);

// container.registerSingleton<IMailProvider>(
//   "MailProvider",
//   delay(() => EtherealMailProvider),
// );

// mailProvider[process.env.MAIL_PROVIDER]

container.registerInstance<IMailProvider>("EthrealMailProvider", new EtherealMailProvider());

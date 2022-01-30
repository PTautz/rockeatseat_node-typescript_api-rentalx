import fs from 'fs';

export const deleteFile = async (filename: string) => {
  try {
    // .stat verifica se o arquivo existe ou não na url informada
    await fs.promises.stat(filename);
  } catch {
    return;
  }
  await fs.promises.unlink(filename);
};

import { inject, injectable } from "tsyringe";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { deleteFile } from "@utils/file";

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
  ) {}
  //   @inject("StorageProvider")
  //   private storageProvider: IStorageProvider,
  //  ) {}

  async execute({ car_id, images_names }: IRequest): Promise<void> {
    const carImageReplacement = await this.carsImagesRepository.findByCarId(car_id);

    // exclui a imagem caso já exista uma imagem para o carro
    if (carImageReplacement) {
      await deleteFile(`./tmp/cars/${carImageReplacement.image_name}`);
      await this.carsImagesRepository.delete(car_id);
    }

    // percorre o array com o caminho das imagens e está salvando no banco
    images_names.map(async image => {
      await this.carsImagesRepository.create(car_id, image);
      // await this.storageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImagesUseCase };

import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/createCarController";

import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { DeleteCarController } from "@modules/cars/useCases/deleteCar/DeleteCarController";
import { DeleteCarImagesController } from "@modules/cars/useCases/deleteCarImages/deleteCarImagesController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const upload = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const deleteCarController = new DeleteCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();
const deleteCarImagesController = new DeleteCarImagesController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRoutes.delete("/", ensureAuthenticated, ensureAdmin, deleteCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);

carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImagesController.handle);

carsRoutes.delete("/images/:id", ensureAuthenticated, ensureAdmin, deleteCarImagesController.handle);

export { carsRoutes };

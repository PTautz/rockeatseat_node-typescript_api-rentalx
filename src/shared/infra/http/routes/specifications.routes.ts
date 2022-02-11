import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { DeleteCarSpecificationsController } from "@modules/cars/useCases/deleteCarSpecifications/deleteCarSpecificationsController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

// outra forma de utilizar middlewares
// specificationRoutes.use(ensureAuthenticated);

const createSpecificationController = new CreateSpecificationController();
const deleteCarSpecificationsController = new DeleteCarSpecificationsController();

specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

specificationsRoutes.delete("/:id", ensureAuthenticated, ensureAdmin, deleteCarSpecificationsController.handle);

export { specificationsRoutes };

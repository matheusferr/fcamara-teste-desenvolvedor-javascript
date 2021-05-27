import { Router } from "express";
import { PaisController } from "../controllers";

const paisRouter = Router();

paisRouter.get("/paises", PaisController.index);
paisRouter.get("/pais/:id", PaisController.searchByID);
paisRouter.get("/pais", PaisController.searchBySigla);

export default paisRouter;

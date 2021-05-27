import { Router } from "express";
import { EstadoController } from "../controllers";

const estadoRouter = Router();

estadoRouter.get("/estados", EstadoController.index);
estadoRouter.get("/estado/:id", EstadoController.searchByID);
estadoRouter.get("/estado", EstadoController.searchBySigla);
estadoRouter.post("/estados", EstadoController.create);
estadoRouter.put("/estado/:id", EstadoController.update);
estadoRouter.delete("/estado/:id", EstadoController.destroy);

export default estadoRouter;

import { Router } from "express";
import { CidadeController } from "../controllers";

const cidadeRouter = Router();

cidadeRouter.get("/cidades", CidadeController.index);
cidadeRouter.get("/cidade/:id", CidadeController.searchByID);
cidadeRouter.get("/cidade", CidadeController.searchByNome);
cidadeRouter.post("/cidades", CidadeController.create);
cidadeRouter.put("/cidade/:id", CidadeController.update);
cidadeRouter.delete("/cidade/:id", CidadeController.destroy);

export default cidadeRouter;

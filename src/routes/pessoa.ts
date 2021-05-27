import { Router } from "express";
import { PessoaController } from "../controllers";

const pessoaRouter = Router();

pessoaRouter.get("/pessoa/:id", PessoaController.searchByID);
pessoaRouter.get("/pessoa", PessoaController.searchByCpf);
pessoaRouter.post("/pessoas", PessoaController.create);
pessoaRouter.put("/pessoa/:id", PessoaController.update);
pessoaRouter.delete("/pessoa/:id", PessoaController.destroy);

export default pessoaRouter;

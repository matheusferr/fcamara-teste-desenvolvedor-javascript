import { Router } from "express";
import paisRouter from "./pais";
import estadoRouter from "./estado";
import cidadeRouter from "./cidade";
import pessoaRouter from "./pessoa";

const router = Router();

router.use(paisRouter);
router.use(estadoRouter);
router.use(cidadeRouter);
router.use(pessoaRouter);

export default router;

import { Router } from "express";

const router = Router();

router.get("/lorem", (req, res) => {
  res.send("Lorem Ipsum");
});

export default router;

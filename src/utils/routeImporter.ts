import fs from "fs";
import path from "path";
import { Router } from "express";

export function routeImporter(): Router {
  const routesDir =
    process.env.NODE_ENV === "dev"
      ? path.join(process.cwd(), "src", "routes")
      : path.join(process.cwd(), "dist", "routes");

  const router = Router();

  fs.readdirSync(routesDir)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        (file.slice(-3) === ".js" || file.slice(-3) === ".ts")
      );
    })
    .forEach(async (file) => {
      const route = Object.values(
        await import(path.join(routesDir, file))
      )[0] as Router;

      router.use(route);
    });

  return router;
}

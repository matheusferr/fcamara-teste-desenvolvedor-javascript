import { Request } from "express";

export function getLocation(req: Request, path: string, id: number) {
  return `${req.protocol}://${req.get("Host")}/api/${path}/${id}`;
}

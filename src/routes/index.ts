import { NextFunction, Request, Response, Router } from "express";
import authentication from "../middlewares/authentication";
import rateLimiter from "../middlewares/rateLimiter";

export default function (router: Router): Router {
  router.get(
    "/country/name/:name",
    authentication,
    rateLimiter,
    (req: Request, res: Response, next: NextFunction) => next()
  );

  router.post("/login", (req: Request, res: Response, next: NextFunction) =>
    next()
  );

  // set a default PING / Health-Check route
  router.get("/ping", (req: Request, res: Response) =>
    res.json({
      status: true,
      message: "Pong...To infintity and beyooooooond",
    })
  );

  // set a default route
  router.use("*", (req: Request, res: Response, next: NextFunction) =>
    next(new ReferenceError("Page no longer exists"))
  );

  return router;
}

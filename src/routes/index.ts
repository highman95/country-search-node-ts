import { IRouter, NextFunction, Request, Response, Router } from "express";
import UserController from "../modules/user/controller";

export default function (router: IRouter): Router {
  [new UserController(router)].forEach((controller) =>
    controller.initializeRoutes()
  );

  // set a default PING / Health-Check route
  router.get("/ping", (req: Request, res: Response) =>
    res.json({
      status: true,
      message: "Pong...To infintity and beyooooooond",
    })
  );

  // set a default route
  router.get("*", (req: Request, res: Response, next: NextFunction) =>
    next(new ReferenceError("Page no longer exists"))
  );

  return router;
}

import { IRouter, NextFunction, Request, Response } from "express";
import Controller from "../../interfaces/controller";

export default class UtilController implements Controller {
  constructor(private readonly router: IRouter) {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    // set a default PING / Health-Check route
    this.router.get("/ping", this.health);

    // set a default route
    this.router.get("*", this.fallback);
  }

  private health(req: Request, res: Response) {
    res.json({
      status: true,
      message: "Pong...To infintity and beyooooooond",
    });
  }

  private fallback(req: Request, res: Response, next: NextFunction) {
    next(new ReferenceError("Page no longer exists"));
  }
}

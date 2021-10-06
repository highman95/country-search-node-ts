import { IRouter, NextFunction, Request, Response } from "express";
import { generateToken } from "../../helpers/security";
import Controller from "../../interfaces/controller";
import userService from "./service";

export default class UserController implements Controller {
  constructor(private readonly router: IRouter) {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/login", this.signIn);
  }

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      const user = await userService.authenticate(username, password);
      const token = generateToken({ username: user.email });
      delete user.password; // delete the password

      res.status(200).json({
        status: true,
        data: { ...user, token },
      });
    } catch (e) {
      next(e);
    }
  };
}

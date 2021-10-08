import { IRouter, NextFunction, Request, Response } from "express";
import { generateToken } from "../../helpers/security";
import Controller from "../../interfaces/controller";
import userService from "./service";

export default class UserController implements Controller {
  constructor(private readonly router: IRouter) {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post("/login", this.signIn);
  }

  private async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const { email, firstName, lastName } = await userService.authenticate(
        username,
        password
      );
      const token = generateToken({
        username: email,
        firstName,
        lastName,
      });

      res.status(200).json({
        status: true,
        message: "Login successful",
        data: { firstName, lastName, email, token },
      });
    } catch (e) {
      next(e);
    }
  }
}

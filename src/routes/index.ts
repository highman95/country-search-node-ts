import { IRouter, Router } from "express";
import CountryController from "../modules/country/controller";
import UserController from "../modules/user/controller";
import UtilController from "../modules/util/controller";

export default function (router: IRouter): Router {
  [
    new CountryController(router),
    new UserController(router),
    new UtilController(router),
  ].forEach((controller) => controller.initializeRoutes());

  return router;
}

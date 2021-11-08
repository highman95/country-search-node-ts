import { IRouter, NextFunction, Request, Response } from "express";
import Controller from "../../interfaces/controller";
import Country from "../../interfaces/country";
import PlatformResponse from "../../interfaces/platformResponse";
import authentication from "../../middlewares/authentication";
import rateLimiter from "../../middlewares/rateLimiter";
import countryService from "./service";

export default class CountryController implements Controller {
  constructor(private readonly router: IRouter) {}

  initializeRoutes(): void {
    this.router.get(
      "/countries/name/:name",
      authentication,
      rateLimiter(process.env.RATE_LIMIT_STORAGE_TYPE),
      this.getCountriesByName
    );
  }

  private async getCountriesByName(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name } = req.params;
      const data = await countryService.getCountriesByName(name);

      res.status(200).json({
        status: true,
        message: "Data successfully fetched",
        data,
      } as PlatformResponse<Country>);
    } catch (e) {
      next(e);
    }
  }
}

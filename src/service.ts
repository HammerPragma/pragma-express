import express from "express";
import { config } from "dotenv";
import { internalServerError, notFound } from "./middlewares/error.middleware";

export abstract class Service {
  private readonly _express: express.Application;

  protected constructor() {
    config();
    this._express = express();
    this.setUp();
  }

  public abstract setRoutes(): void;

  get express(): express.Application {
    return this._express;
  }

  public setUp(): void {
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    //
  }

  private catchErrors(): void {
    this._express.use(notFound);
    this._express.use(internalServerError);
  }
}

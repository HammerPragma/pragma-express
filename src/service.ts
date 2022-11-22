/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
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
    this._express.use(cors())
    this._express.use(morgan('dev'))
    this._express.use(bodyParser.json())
    this._express.use(bodyParser.urlencoded({extended: false}))
    this._express.use(helmet())
  }

  private catchErrors(): void {
    this._express.use(notFound);
    this._express.use(internalServerError);
  }
}

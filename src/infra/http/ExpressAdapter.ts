import Http from "./Http";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import AppError from "../shared/error/AppError";
export default class ExpressAdapter implements Http {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      next();
    });
  }

  route(method: string, url: string, callback: Function): void {
    this.app[method](url, async function (req: Request, res: Response) {
      const output = await callback(req.params, req.body, req.query);
      res.status(200).json(output);
    });
  }

  exceptionHandler() {
    this.app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          message: err.message,
        });
      }
      return response.status(500).json({
        message: "Internal Server error",
      });
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Api rodando na porta http://127.0.0.1:${port}`);
    });
  }
}

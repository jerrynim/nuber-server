import cors from "cors";
import { NextFunction, Response } from "express";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: (req) => {
        return {
          req: req.request
        };
      }
      /*context는 서버가 reslover등으로 주는 데이터 */
    });

    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(helmet());
    /* 요청을 안전한지 검사*/
    this.app.express.use(logger("dev"));
    /*미들웨어가 로그를 남김*/
    this.app.express.use(this.jwt);
  };

  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("X-JWT");
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
  };
}
export default new App().app;

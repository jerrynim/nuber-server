import cors from "cors";
import { NextFunction, Response } from "express";
import { GraphQLServer, PubSub } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
class App {
  public app: GraphQLServer;
  public pubSub: any;
  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(
      99
    ); /*제품 단계에서는 Redies 나 Mecached등을 사용해야함 */
    this.app = new GraphQLServer({
      schema,
      context: (req) => {
        const { connection: { context = null } = {} } = req;
        /*connections 은 웹소켓으로 부터의 req context의 default로
         null을 주고 connection의 default로 {}주는 방식 */
        return {
          req: req.request,
          pubSub: this.pubSub,
          context
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
    next();
  };
}

export default new App().app;

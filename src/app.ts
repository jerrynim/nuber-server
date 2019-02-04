import cors from "cors";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      schema
    });

    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(helmet());
    /* 요청을 안전한지 검사*/
    this.app.express.use(logger("dev"));
    /*미들웨어가 로그를 남김*/
  };
}
export default new App().app;

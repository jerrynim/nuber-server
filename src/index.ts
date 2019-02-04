import dotenv from "dotenv";
dotenv.config();
import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
import connectionsOptions from "./ormConfig";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT
};

const handleAPpStart = () => console.log(`Listening on port ${PORT}`);

createConnection(connectionsOptions)
  .then(() => {
    app.start(appOptions, handleAPpStart);
  })
  .catch((error) => console.log(error));

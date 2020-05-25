// https://blog.harveydelaney.com/setting-up-graphql-express-and-postgresql/
import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { IConnectionParameters, IClient } from "pg-promise/typescript/pg-subset";

dotenv.config();

const pgp = pgPromise({}); // Empty object means no additional config required

const config: IConnectionParameters<IClient> = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: { rejectUnauthorized: false },
};

export const db = pgp(config);

import { Sequelize } from "sequelize";
import pg from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}

const sequelize = new Sequelize(databaseUrl, {
  logging: false,
  dialect: "postgres",
  dialectModule: pg,
});

export default sequelize;

import { DataSource } from "typeorm";
import { Task } from "../modules/tasks/entities/task.entity";
import { User } from "../modules/users/entities/user.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "taskmanager",
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  entities: [Task, User],
  subscribers: [],
  migrations: [],
});

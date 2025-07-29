import { ConnectOptions as MongoDBOptions } from "mongoose";

enum Env {
  development = "development",
  production = "production",
  unittest = "unittest",
}

interface Config {
  server?: {
    port: number;
  };
  mongodb?: {
    uri: string;
    options: MongoDBOptions;
  };
  redis?: {
    host: string;
    port: number;
    db?: number;
    username?: string;
    password?: string; // TOFIX 目前不支持特殊字符
  };
  cors?: {
    origin: string[];
  };
}

const defaultConfig: Config = {
  server: {
    port: 3003,
  },
  cors: {
    origin: ["http://localhost:5173"],
  },
  mongodb: {
    uri: "mongodb://localhost:27017",
    options: {
      user: "root",
      pass: "Super123456",
      dbName: "demo",
      authSource: "admin",
    },
  },
  redis: {
    host: "localhost",
    port: 6379,
    db: 0,
    username: "",
    password: "Super123456",
  },
};

const configs: Record<Env, Config> = {
  development: {},
  production: {},
  unittest: {},
};

const config =
  configs[Bun.env.NODE_ENV as "development" | "production" | "unittest"];

export default {
  ...defaultConfig,
  ...config,
};

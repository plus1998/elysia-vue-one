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
    password?: string; // 不支持特殊字符
  };
}

const defaultConfig: Config = {
  server: {
    port: 3003,
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

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
// modules
import { db } from "./mongodb";
import config from "@backend/config";

if (!db.connection.db) throw new Error("MongoDB is not connected");

const BetterAuth = betterAuth({
  database: mongodbAdapter(db.connection.db),
  trustedOrigins: config.cors?.origin || [],
  plugins: [admin()],
  emailAndPassword: {
    enabled: true,
  },
});

// 默认注册管理员
try {
  await BetterAuth.api.createUser({
    body: {
      email: "admin@plus.com",
      password: "public",
      name: "Admin",
      role: "admin",
    },
  });
  console.log("[Register Admin]", "Success");
} catch (error: any) {
  console.log('[Register Admin]', error.message);
}

export default BetterAuth;

import { Elysia } from "elysia";
import config from "@backend/config";

export const corsService = new Elysia({ name: "cors" })
  .onRequest(({ request, set }) => {
    const origin = request.headers.get("origin");
    set.headers["Access-Control-Allow-Origin"] = origin || "*";
    set.headers["Access-Control-Allow-Methods"] =
      "GET, POST, PUT, DELETE, OPTIONS";
    set.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
    set.headers["Access-Control-Allow-Credentials"] = "true";
    // 处理预检请求
    if (request.method === "OPTIONS") {
      set.status = 204;
      return new Response(null, { status: 204 });
    }
  })
  .onAfterHandle(({ request, set }) => {
    const origin = request.headers.get("origin");
    // 为所有响应添加 CORS 头
    if (origin && config.cors?.origin.includes(origin)) {
      set.headers["Access-Control-Allow-Origin"] = origin;
      set.headers["Access-Control-Allow-Credentials"] = "true";
    }
  });

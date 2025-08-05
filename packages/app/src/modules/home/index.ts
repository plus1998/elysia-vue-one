import { Elysia } from "elysia";

export const HomeController = new Elysia({ name: "home", prefix: "/home" })
  .get(
    "/hi",
    async () => {
      return 'Hi,Elysia!'
    },
  );
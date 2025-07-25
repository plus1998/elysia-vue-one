import { t, TSchema } from "elysia";

export const BaseReponse = <T extends TSchema>(dataType: T) => {
  return t.Object({
    success: t.Boolean(),
    data: t.Optional(dataType),
    error: t.Optional(t.String()),
  });
}

export type BaseReponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
};

import { Infer, array, boolean, number, object, string } from "superstruct";

export const DatalogGetStruct = object({
  error: boolean(),
  ok: boolean(),
  rv: object({
    data: array(array(number())),
  }),
  seq: number(),
  systime: number(),
  time: number(),
  type: string(),
});

export type DatalogGetResponse = Infer<typeof DatalogGetStruct>;

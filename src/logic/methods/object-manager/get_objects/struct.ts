import {
  Infer,
  any,
  array,
  boolean,
  nullable,
  number,
  object,
  optional,
  record,
  string,
  union,
} from "superstruct";

export const ObjectManagerGetObjectsResponseStruct = object({
  ok: boolean(),
  type: string(),
  time: number(),
  rv: object({
    objects: array(
      object({
        driver: string(),
        name: string(),
        oid: string(),
        propsval: union([
          array(
            object({
              id: string(),
              value: union([boolean(), number(), string()]),
              daystart: optional(array(number())),
            }),
          ),
          record(string(), any()),
        ]),
        propertyInfo: array(
          object({
            type: string(),
            label: string(),
            id: string(),
            writable: optional(boolean()),
            persistent: optional(boolean()),
            fn_set: optional(nullable(any())),
            default: optional(union([boolean(), number(), string()])),
            range: optional(string()),
            timer: optional(boolean()),
            filtmin: optional(number()),
            filtmax: optional(number()),
            log: optional(boolean()),
            unit: optional(string()),
            cumulative: optional(boolean()),
            logchange: optional(boolean()),
            log_interval: optional(number()),
            hidden: optional(boolean()),
          }),
        ),
        uid: string(),
        type: string(),
      }),
    ),
    version: object({
      type: string(),
      user: string(),
      date: string(),
      host: string(),
      time: string(),
      tag: string(),
      version: string(),
      serial: string(),
      build: string(),
    }),
    first_ts: number(),
  }),
  systime: number(),
  seq: number(),
  error: boolean(),
});

export type ObjectManagerGetObjectsResponse = Infer<
  typeof ObjectManagerGetObjectsResponseStruct
>;

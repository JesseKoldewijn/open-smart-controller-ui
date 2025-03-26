import { api, createApiHook } from "~/lib/api";
import { ApiOptions } from "~/lib/api/types";
import { DatalogGetResponse } from "~/logic/methods/datalog/struct";

interface DatalogGetOptions extends ApiOptions {
  arguments: {
    oid: string | null;
    prop: string;
    resolution: number;
    t1: number;
    t2: number;
    aggregate: string | null;
  };
}

const opts = {
  seq: 1,
  method: "datalog_get",
  arguments: {
    oid: null,
    prop: "usage",
    resolution: 1,
    t1: Date.now(),
    t2: Date.now() + 2500,
    aggregate: null,
  },
  timeout: 4000,
} as const satisfies DatalogGetOptions;

export const getDatalog = (ip: string, _opts?: ApiOptions) =>
  api<DatalogGetResponse>(ip, { ...opts, ..._opts });

export const useDatalogGet = (ip: string, _opts?: ApiOptions) => {
  const api = createApiHook<DatalogGetResponse>(
    ip,
    { ...opts, ..._opts },
    {
      //   stateUpdateCallback: (data) => {
      //     if (data.ok) {
      //       const state =
      //         objectManagerStore.getObjectManagerObjectsStore.getState();
      //       state.setVersionData({
      //         ip,
      //         data,
      //       });
      //     }
      //   },
    },
  );

  return api;
};

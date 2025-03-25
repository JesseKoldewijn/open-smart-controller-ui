import { ApiHookOptions, createApiHook } from "~/lib/api";
import { internal_api } from "~/lib/api/internals";
import { ApiOptions } from "~/lib/api/types";
import { systemStore } from "~/store/system";

const opts = {
  seq: 1,
  method: "sysinfo_version",
  arguments: {},
} satisfies ApiOptions;

export interface SystemVersionRv {
  type: string;
  user: string;
  date: string;
  host: string;
  time: string;
  tag: string;
  version: string;
  serial: string;
  build: string;
}

interface SystemVersionResponse {
  ok: boolean;
  type: "response";
  time: number;
  rv: {
    version: SystemVersionRv;
  };
  systime: number;
  seq: number;
  error: boolean;
}

export const useSystemVersionQuery = (
  ip: string,
  _opts?: ApiOptions,
  apiHookOptions?: ApiHookOptions,
) => {
  const store = systemStore.getVersionStore.getState();
  const updateState =
    apiHookOptions?.stateUpdateCallback ?? store.setVersionData;

  return createApiHook<SystemVersionResponse>(ip, _opts ?? opts, {
    ...apiHookOptions,
    stateUpdateCallback: (data: { ip: string; data: SystemVersionRv }) => {
      if (data) {
        updateState(data);
      }
    },
  });
};

export const getSystemVersion = (ip: string) =>
  internal_api<SystemVersionResponse>(ip, opts);

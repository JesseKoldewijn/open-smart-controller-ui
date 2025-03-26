import { api } from "~/lib/api";
import { ApiOptions } from "~/lib/api/types";

const opts = {
  seq: 1,
  method: "api_ping",
  arguments: {},
  timeout: 2000,
} as const satisfies ApiOptions;

interface SystemPingResponse {
  ok: boolean;
  type: "response";
  time: number;
  rv: {
    version: {
      type: string;
      user: string;
      date: string;
      host: string;
      time: string;
      tag: string;
      version: string;
      serial: string;
      build: string;
    };
  };
  systime: number;
  seq: number;
  error: boolean;
}

export const getSystemPing = (ip: string, _opts?: ApiOptions) =>
  api<SystemPingResponse>(ip, { ...opts, ..._opts });

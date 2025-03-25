import { Workbox } from "workbox-window/Workbox";

export const MESSAGES = {
  GET_PING: "GET_PING",
  GET_VERSION: "GET_VERSION",
  SKIP_WAITING: "SKIP_WAITING",
  GET_IP_ADDRESS_IS_CONTROLLER: "GET_IP_ADDRESS_IS_CONTROLLER",
};

export const wb = new Workbox("/ws-worker.js", {
  type: "module",
});

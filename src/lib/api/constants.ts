const defaults = {
  DEFAULT_DOMAIN: "http://127.0.0.1",
  DEFAULT_SEQ: 1,
} as const;

export const API_CONSTANTS = {
  PATHNAME: "/iungo/api_request",
  HTTP_METHOD: "POST",
  DEFAULT_DOMAIN: defaults.DEFAULT_DOMAIN,
  DEFAULT_OPTIONS: {
    method: "",
    arguments: {},
    seq: defaults.DEFAULT_SEQ,
  },
  POLLING: {
    ENABLED: false,
    INTERVAL: {
      DEFAULT: 1000,
      MIN: 500,
      MAX: 10000,
    },
  },
} as const;

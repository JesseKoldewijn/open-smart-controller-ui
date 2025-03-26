import { useQuery as query } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { API_CONSTANTS } from "~/lib/api/constants";
import { internal_api } from "~/lib/api/internals";

import { ApiOptions as ApiBody } from "./types";

export const api = <GenericResponseType>(
  ipAddress: string = API_CONSTANTS.DEFAULT_DOMAIN,
  body: ApiBody,
  stateUpdateCallback?: <GenericResponseType>(
    data: GenericResponseType,
  ) => void,
) => {
  return internal_api<GenericResponseType>(
    ipAddress,
    body,
    stateUpdateCallback,
  );
};

export interface ApiHookOptions {
  polling?: boolean;
  enabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stateUpdateCallback?: (data: any) => void;
}

export const createApiHook = <GenericResponseType>(
  ipAddress: string = API_CONSTANTS.DEFAULT_DOMAIN,
  opts: ApiBody,
  apiHookOptions?: ApiHookOptions,
) => {
  const {
    polling = false,
    enabled = true,
    stateUpdateCallback,
  } = apiHookOptions ?? {};

  const [isPolling, setIsPolling] = useState(polling);

  const enablePolling = () => {
    setIsPolling(true);
  };

  const disablePolling = () => {
    setIsPolling(false);
  };

  const q = query({
    queryKey: [JSON.stringify(opts.method)],
    queryFn: enabled
      ? async () =>
          api<GenericResponseType>(ipAddress, opts, stateUpdateCallback)
      : async () => ({}) as ReturnType<typeof api<GenericResponseType>>,
    retryDelay: 2000,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPolling) {
      interval = setInterval(() => {
        q.refetch();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPolling]);

  return {
    ...q,
    enablePolling,
    disablePolling,
  };
};

export const createApiPollingStack = <GenericResponseType>(
  ipAddress: string = API_CONSTANTS.DEFAULT_DOMAIN,
  opts: ApiBody,
  {
    apiHookOptions,
  }: {
    apiHookOptions?: ApiHookOptions;
  },
) => {
  const api = createApiHook<GenericResponseType>(ipAddress, opts, {
    ...apiHookOptions,
  });
  const [stackedData, setStackedData] = useState<GenericResponseType[]>(
    api.data ? [api.data] : [],
  );

  useEffect(() => {
    if (api.data) {
      setStackedData((prev) => [
        ...new Set([...prev, api.data as GenericResponseType]),
      ]);
    }
  }, [api.data]);

  useEffect(() => {
    if (api.isError) {
      api.disablePolling();
    }
  }, [api.isError]);

  useEffect(() => {
    if (api.isFetched) {
      api.enablePolling();
    }
  }, [api.isFetched]);

  const apiWithoutData = Object.entries(api)
    .filter(([key]) => key !== "data")
    .reduce(
      (x) => x,
      {} as Omit<ReturnType<typeof createApiHook<GenericResponseType>>, "data">,
    );

  return {
    ...apiWithoutData,
    initialData: api.data,
    stackedData,
  };
};

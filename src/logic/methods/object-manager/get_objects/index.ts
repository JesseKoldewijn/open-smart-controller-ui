import { api, createApiHook } from "~/lib/api";
import { ApiOptions } from "~/lib/api/types";
import type { ObjectManagerGetObjectsResponse } from "~/logic/methods/object-manager/get_objects/types";
import { objectManagerStore } from "~/store/object_manager";
import { getObjectManagerObjectsByIp } from "~/store/selectors/objectManagerStore";

const opts = {
  seq: 1,
  method: "objmgr_get_objects_with_values_and_metadata",
  arguments: {},
  timeout: 4000,
} as const satisfies ApiOptions;

export const getObjectManagerObjects = (ip: string, _opts?: ApiOptions) =>
  api<ObjectManagerGetObjectsResponse>(ip, { ...opts, ..._opts });

export const useObjectManagerObjects = (ip: string, _opts?: ApiOptions) => {
  const api = createApiHook<ObjectManagerGetObjectsResponse>(
    ip,
    { ...opts, ..._opts },
    {
      stateUpdateCallback: (data) => {
        if (data.ok) {
          const state =
            objectManagerStore.getObjectManagerObjectsStore.getState();
          state.setVersionData({
            ip,
            data,
          });
        }
      },
    },
  );

  const initialData = getObjectManagerObjectsByIp(ip);

  const isDataEqual = initialData?.time === api.data?.time;
  const dataIsEmpty = !api.data;

  return {
    ...api,
    data: isDataEqual || dataIsEmpty ? initialData : api.data,
  };
};

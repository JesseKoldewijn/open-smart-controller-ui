import { createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { ObjectManagerGetObjectsResponse } from "~/logic/methods/object-manager/get_objects/types";
import { deepMerge } from "~/store";

export const ObjectManagerObjectsStoreNamespace = "object_manager>objects";

interface ObjectManagerObjects {
  objects: {
    ip: string;
    data: ObjectManagerGetObjectsResponse;
  }[];
  setVersionData: ({
    ip,
    data,
  }: {
    ip: string;
    data: ObjectManagerGetObjectsResponse;
  }) => void;
}

const objectManagerObjectsStore = createStore<ObjectManagerObjects>()(
  devtools(
    persist(
      (set, get) => {
        return {
          objects: [],
          setVersionData: ({ ip, data }) => {
            const prev = new Set(get().objects);
            const hasIp = !![...prev].find((x) => x.ip === ip);

            if (!hasIp) {
              set({
                objects: [
                  ...get().objects,
                  {
                    ip,
                    data,
                  },
                ],
              });
            } else {
              set({
                objects: get().objects.map((x) => {
                  if (x.ip === ip) {
                    return {
                      ip,
                      data,
                    };
                  }
                  return x;
                }),
              });
            }
          },
        };
      },
      {
        name: ObjectManagerObjectsStoreNamespace,
        merge: (persisted, current) => deepMerge(current, persisted) as never,
      },
    ),
  ),
);

export const objectManagerStore = {
  getObjectManagerObjectsStore: objectManagerObjectsStore,
};

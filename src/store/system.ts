import { createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { SystemVersionRv } from "~/logic/methods/system/sysinfo_version";
import { deepMerge } from "~/store";

export const SystemVersionStoreNamespace = "system>version";

interface SystemVersion {
  version: {
    ip: string;
    data: SystemVersionRv;
  }[];
  setVersionData: ({ ip, data }: { ip: string; data: SystemVersionRv }) => void;
}

const versionStore = createStore<SystemVersion>()(
  devtools(
    persist(
      (set, get) => ({
        version: [] as {
          ip: string;
          data: SystemVersionRv;
        }[],
        setVersionData: ({ ip, data }) => {
          const prev = new Set(get().version);
          const hasIp = !![...prev].find((x) => x.ip === ip);

          if (!hasIp) {
            set({
              version: [
                ...get().version,
                {
                  ip,
                  data,
                },
              ],
            });
          } else {
            set({
              version: get().version.map((x) => {
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
      }),
      {
        name: SystemVersionStoreNamespace,
        merge: (persisted, current) => deepMerge(current, persisted) as never,
      },
    ),
  ),
);

export const systemStore = {
  getVersionStore: versionStore,
};

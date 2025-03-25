import { createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { deepMerge } from "~/store";

export const NetworkClientStoreNamespace = "network>client";

interface NetworkClient {
  ipAddresses: string[];
  ipAddressRanges: string[];
  setIpAddresses: (data: string[]) => void;
  setIpRanges: (data: string[]) => void;
}

const networkClientStore = createStore<NetworkClient>()(
  devtools(
    persist(
      (set) => ({
        ipAddresses: [],
        ipAddressRanges: [],
        setIpAddresses: (data: string[]) => set({ ipAddresses: data }),
        setIpRanges: (data: string[]) => set({ ipAddressRanges: data }),
      }),
      {
        name: NetworkClientStoreNamespace,
        merge: (persisted, current) => deepMerge(current, persisted) as never,
      },
    ),
  ),
);

export const networkStore = {
  getNetworkClientStore: networkClientStore,
};

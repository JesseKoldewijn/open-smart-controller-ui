import { createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getConnectionStatus } from "~/logic/network/detection";
import { deepMerge } from "~/store";

export const NetworkClientStoreNamespace = "network>client";

type NetworkClientDetailsType = ReturnType<typeof getConnectionStatus>;

interface NetworkClient {
	connectionDetails: NetworkClientDetailsType;
	setConnectionDetails: (data: NetworkClientDetailsType) => void;
}

const networkClientStore = createStore<NetworkClient>()(
	devtools(
		persist(
			(set) => ({
				connectionDetails: {} as NetworkClientDetailsType,
				setConnectionDetails: (data: NetworkClientDetailsType) =>
					set({ connectionDetails: data }),
			}),
			{
				name: NetworkClientStoreNamespace,
				merge: (persisted, current) =>
					deepMerge(current, persisted) as never,
			}
		)
	)
);

export const networkStore = {
	getNetworkClientStore: networkClientStore,
};

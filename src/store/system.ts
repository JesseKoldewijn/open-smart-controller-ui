import { createStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { SystemVersionRv } from "~/logic/methods/system/sysinfo_version";
import { deepMerge } from "~/store";

export const SystemVersionStoreNamespace = "system>version";

interface SystemVersion {
	version: SystemVersionRv;
	setVersionData: (data: SystemVersionRv) => void;
}

const versionStore = createStore<SystemVersion>()(
	devtools(
		persist(
			(set) => ({
				version: {} as SystemVersionRv,
				setVersionData: (data: SystemVersionRv) =>
					set({ version: data }),
			}),
			{
				name: SystemVersionStoreNamespace,
				merge: (persisted, current) =>
					deepMerge(current, persisted) as never,
			}
		)
	)
);

export const systemStore = {
	getVersionStore: versionStore,
};

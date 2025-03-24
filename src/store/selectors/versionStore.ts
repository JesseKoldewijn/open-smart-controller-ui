import { systemStore } from "~/store/system";

export const getVersionStoreByIP = (ip?: string) => {
	if (!ip) return null;
	const { version: versionData } = systemStore.getVersionStore.getState();
	return versionData.find((x) => x.ip === ip) ?? null;
};

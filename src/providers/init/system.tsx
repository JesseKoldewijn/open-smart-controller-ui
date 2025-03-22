import { useEffect } from "react";
import { getSystemVersion } from "~/logic/methods/system/sysinfo_version";
import { systemStore, SystemVersionStoreNamespace } from "~/store/system";

const SystemInitProvider = ({ children }: { children: React.ReactNode }) => {
	const { setVersionData } = systemStore.getVersionStore.getState();

	useEffect(() => {
		const hasStore = !!localStorage.getItem(SystemVersionStoreNamespace);
		const lastUpdated = localStorage.getItem(
			`${SystemVersionStoreNamespace}>lastUpdated`
		);
		const now = new Date().getTime();

		const getMinutesInMs = (minutes: number) => minutes * 60 * 1000;

		const needsUpdate =
			!lastUpdated || now - parseInt(lastUpdated) > getMinutesInMs(15);

		if (!hasStore || needsUpdate) {
			const fetchData = async () => {
				const data = await getSystemVersion();
				if (data) {
					setVersionData(data.rv.version);
				}
			};

			fetchData();

			localStorage.setItem(
				`${SystemVersionStoreNamespace}>lastUpdated`,
				now.toString()
			);
		}
	}, []);

	return children;
};

export default SystemInitProvider;

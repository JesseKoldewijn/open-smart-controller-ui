import { useEffect } from "react";
import { Time } from "~/lib/utils/time";
import { validateIpAddressesAndRanges } from "~/logic/network/detection";
import { networkStore, NetworkClientStoreNamespace } from "~/store/network";

const NetworkInitProvider = ({ children }: { children: React.ReactNode }) => {
	const { setIpAddresses, setIpRanges } =
		networkStore.getNetworkClientStore.getState();

	useEffect(() => {
		const hasStore = !!localStorage.getItem(NetworkClientStoreNamespace);
		const lastUpdated = localStorage.getItem(
			`${NetworkClientStoreNamespace}>lastUpdated`
		);
		const now = new Date().getTime();

		const needsUpdate =
			!lastUpdated ||
			now - parseInt(lastUpdated) > Time.getMinutesInMs(15);

		if (!hasStore || needsUpdate) {
			const data = validateIpAddressesAndRanges();

			setIpAddresses(data.ipAddresses);
			setIpRanges(data.ipAddressRanges);

			localStorage.setItem(
				`${NetworkClientStoreNamespace}>lastUpdated`,
				now.toString()
			);
		}
	}, []);

	return children;
};

export default NetworkInitProvider;

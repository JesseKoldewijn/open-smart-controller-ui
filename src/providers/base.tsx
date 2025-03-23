import NetworkInitProvider from "~/providers/init/network";
import SystemInitProvider from "~/providers/init/system";

export const BaseProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<SystemInitProvider>
			<NetworkInitProvider>{children}</NetworkInitProvider>
		</SystemInitProvider>
	);
};

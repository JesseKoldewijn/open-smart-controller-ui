import { createFileRoute, Link } from "@tanstack/react-router";
import { networkStore } from "~/store/network";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { ipAddresses } = networkStore.getNetworkClientStore.getState();

	return (
		<>
			{ipAddresses ? (
				ipAddresses.map((ip) => (
					<div
						key={ip}
						className="flex gap-2 rounded-md border max-w-sm px-3 py-2 justify-center items-center"
					>
						{ip}
						<Link
							to={`/controller/$ip`}
							params={{
								ip,
							}}
							className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-1 px-3 rounded"
						>
							Open Controller
						</Link>
					</div>
				))
			) : (
				<>No IP addresses in store</>
			)}
		</>
	);
}

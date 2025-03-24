import { createFileRoute } from "@tanstack/react-router";
import { systemStore } from "~/store/system";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { version: versionData } = systemStore.getVersionStore.getState();
	const versionDataArray = versionData.map((x) => ({
		ip: x.ip,
		version: x.data.version,
		date: x.data.date,
		serial: x.data.serial,
		build: x.data.build,
	}));

	return (
		<div>
			<div style={{ minHeight: 160 }}>
				<pre>
					{JSON.stringify(
						versionDataArray.map((x) => ({
							ip: x.ip,
							serial: x.serial,
							version: x.version,
							build: x.build,
							lastUpdated: x.date,
						})),
						null,
						2
					)}
				</pre>
			</div>
		</div>
	);
}

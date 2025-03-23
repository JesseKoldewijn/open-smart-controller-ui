import { createFileRoute } from "@tanstack/react-router";
import { systemStore } from "~/store/system";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { version: versionData } = systemStore.getVersionStore.getState();
	const { version, date, serial, build } = versionData;

	return (
		<div>
			<div style={{ minHeight: 160 }}>
				<pre>
					{JSON.stringify(
						{ serial, version, build, lastUpdated: date },
						null,
						2
					)}
				</pre>
			</div>
		</div>
	);
}

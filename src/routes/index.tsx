import { createFileRoute } from "@tanstack/react-router";
import { systemStore } from "~/store/system";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { version } = systemStore.getVersionStore.getState();

	return (
		<div>
			<div style={{ minHeight: 160 }}>
				<pre>{JSON.stringify(version, null, 2)}</pre>
			</div>
		</div>
	);
}

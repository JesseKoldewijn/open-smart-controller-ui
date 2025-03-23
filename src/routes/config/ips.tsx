import { createFileRoute } from "@tanstack/react-router";
import { UpdateIpForm } from "~/components/network/forms/update_ips";

export const Route = createFileRoute("/config/ips")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<UpdateIpForm />
		</div>
	);
}

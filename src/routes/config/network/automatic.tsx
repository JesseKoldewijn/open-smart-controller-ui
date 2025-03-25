import { createFileRoute } from "@tanstack/react-router";
import { getBrowser } from "~/lib/browser";

export const Route = createFileRoute("/config/network/automatic")({
	component: RouteComponent,
});

function RouteComponent() {
	const browser = getBrowser();

	return <div>Hello {browser.vendor} user!</div>;
}

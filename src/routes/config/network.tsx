import { createFileRoute } from "@tanstack/react-router";

import { UpdateIpForm } from "~/components/network/forms/update_ips/root";

export const Route = createFileRoute("/config/network")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UpdateIpForm />;
}

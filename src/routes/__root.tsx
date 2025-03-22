import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { BaseProviders } from "~/providers/base";

export const Route = createRootRoute({
	component: () => (
		<BaseProviders>
			<Outlet />
			<TanStackRouterDevtools />
		</BaseProviders>
	),
});

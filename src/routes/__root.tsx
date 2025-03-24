import "~/styles/tailwind.css";

import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { BaseProviders } from "~/providers/base";

export const Route = createRootRoute({
	component: () => (
		<BaseProviders>
			<nav className="flex gap-2 px-3 py-2 fixed w-full bg-neutral-900">
				<Link to="/">Open Smart-Controller</Link>
			</nav>
			<main className="flex flex-col min-h-svh pt-12 pb-10 items-center justify-center gap-4">
				<Outlet />
			</main>
			<TanStackRouterDevtools />
		</BaseProviders>
	),
});

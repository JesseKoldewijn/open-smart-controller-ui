import "~/styles/tailwind.css";

import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { BaseProviders } from "~/providers/base";

export const Route = createRootRoute({
	component: () => (
		<BaseProviders>
			<nav className="flex gap-2 py-4 px-3 fixed w-full bg-neutral-900 justify-center items-center">
				<Link to="/">Open Smart-Controller</Link>

				<div className="ml-auto text-xs flex gap-2 my-auto">
					<Link
						to="/config/network/automatic"
						className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-1 px-3 rounded"
					>
						Add Controller
					</Link>
				</div>
			</nav>
			<main className="flex flex-col min-h-svh pt-12 pb-10 items-center justify-center gap-4">
				<Outlet />
			</main>
			<TanStackRouterDevtools />
		</BaseProviders>
	),
});

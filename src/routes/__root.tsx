import "~/styles/tailwind.css";

import {
	createRootRoute,
	Link,
	Outlet,
	useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { BaseProviders } from "~/providers/base";
import { FileRouteTypes } from "~/routeTree.gen";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const loc = useLocation();

	const hideIfCurrent = (path: FileRouteTypes["to"]) => {
		return loc.pathname === path
			? {
					display: "none",
			  }
			: undefined;
	};

	return (
		<BaseProviders>
			<nav className="flex gap-2 py-4 px-3 fixed w-full bg-neutral-900 justify-center items-center">
				<Link to="/">Open Smart-Controller</Link>

				<div className="ml-auto text-xs flex gap-2 my-auto">
					<Link
						to="/"
						className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-1 px-3 rounded"
						style={hideIfCurrent("/")}
					>
						Dashboard
					</Link>
					<Link
						to="/config/network"
						className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-1 px-3 rounded"
						style={hideIfCurrent("/config/network")}
					>
						Networking
					</Link>
				</div>
			</nav>
			<main className="flex flex-col min-h-svh pt-12 pb-10 items-center justify-center gap-4">
				<Outlet />
			</main>
			<TanStackRouterDevtools />
		</BaseProviders>
	);
}

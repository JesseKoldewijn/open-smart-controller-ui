import {
  Link,
  Outlet,
  createRootRoute,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { BaseProviders } from "~/providers/base";
import { FileRouteTypes } from "~/routeTree.gen";
import "~/styles/tailwind.css";

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
      <nav className="fixed flex w-full items-center justify-center gap-2 bg-neutral-900 px-3 py-4">
        <Link to="/" className="cursor-pointer font-bold">
          Open Smart-Controller
        </Link>

        <div className="my-auto ml-auto flex gap-2 text-xs">
          <Link
            to="/"
            className="cursor-pointer rounded bg-neutral-500 px-3 py-1 font-bold text-white hover:bg-neutral-700"
            style={hideIfCurrent("/")}
          >
            Dashboard
          </Link>
          <Link
            to="/config/network"
            className="cursor-pointer rounded bg-neutral-500 px-3 py-1 font-bold text-white hover:bg-neutral-700"
            style={hideIfCurrent("/config/network")}
          >
            Networking
          </Link>
        </div>
      </nav>
      <main className="flex min-h-svh flex-col items-center justify-center gap-4 pt-12 pb-10">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </BaseProviders>
  );
}

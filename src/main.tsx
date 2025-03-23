import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { wb } from "~/lib/worker";

// Create a new router instance
const router = createRouter({
	routeTree,
	defaultSsr: true,
	defaultNotFoundComponent: () => <div>404 - Not Found</div>,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient();
const appRoot = createRoot(document.getElementById("app")!);
appRoot.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);

if ("serviceWorker" in navigator) {
	wb.register();
}

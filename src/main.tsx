import { Workbox } from "workbox-window/Workbox";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

// Create a new router instance
const router = createRouter({ routeTree });

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
	const wb = new Workbox("/ws-worker.js", {
		type: "module",
	});

	wb.register();
	const isStuck = navigator.serviceWorker.controller?.state !== "activated";
	if (isStuck) {
		navigator.serviceWorker.ready.then((registration) => {
			registration.update();
			if (registration.installing) {
				registration.installing.postMessage({ type: "SKIP_WAITING" });
			}
		});
	}

	(async () => {
		const registration = await navigator.serviceWorker.ready;
		registration.update();

		const swVersion = await wb.messageSW({ type: "GET_VERSION" });

		if (swVersion) {
			console.log(`Service Worker Version: ${swVersion}`);
		}
	})();
}

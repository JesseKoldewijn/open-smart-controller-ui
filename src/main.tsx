import { StrictMode } from "react";
import { render } from "preact";
import { App } from "./app";

import { Workbox } from "workbox-window/Workbox";

render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById("app")!
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

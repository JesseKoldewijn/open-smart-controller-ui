const SW_VERSION = "1.0.0";

self.addEventListener("activate", (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
	if (event.data.type === "SKIP_WAITING") {
		self.clients.claim();
	}
	if (event.data.type === "GET_VERSION") {
		event.ports[0].postMessage(SW_VERSION);
	}
});

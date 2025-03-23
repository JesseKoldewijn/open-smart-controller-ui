const SW_VERSION = "1.0.0";

const MESSAGES = {
	GET_PING: "GET_PING",
	GET_VERSION: "GET_VERSION",
	SKIP_WAITING: "SKIP_WAITING",
	GET_IP_ADDRESS_IS_CONTROLLER: "GET_IP_ADDRESS_IS_CONTROLLER",
};

self.addEventListener("activate", (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener("message", async (event) => {
	if (event.data.type === MESSAGES.SKIP_WAITING) {
		self.clients.claim();
		event.ports[0].postMessage("waiting has been skipped");
	}
	if (event.data.type === MESSAGES.GET_PING) {
		event.ports[0].postMessage("pong");
	}
	if (event.data.type === MESSAGES.GET_VERSION) {
		event.ports[0].postMessage(SW_VERSION);
	}
	if (event.data.type === MESSAGES.GET_IP_ADDRESS_IS_CONTROLLER) {
		const ipAddr = JSON.parse(event.data.message);
		const res = await ipAddressPing(ipAddr);
		event.ports[0].postMessage({
			ipAddress: ipAddr,
			isController: res,
		});
	}
});

async function ipAddressPing(ipAdd) {
	const res = await fetch(`http://${ipAdd}/iungo/api_request`, {
		method: "POST",
		body: JSON.stringify({
			seq: 1,
			method: "api_ping",
			arguments: {},
		}),
	});
	if (res.ok) {
		const data = await res.json();
		if (data.rv.pong === "pong") {
			return true;
		}
	}
	return false;
}

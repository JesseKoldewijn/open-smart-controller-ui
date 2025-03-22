export const getConnectionStatus = () => {
	const hasApiAvailable =
		"connection" in navigator ||
		"mozConnection" in navigator ||
		"webkitConnection" in navigator;

	if (!hasApiAvailable) return null;

	const navConn = navigator as unknown as {
		mozConnection?: NetworkInformation;
		webkitConnection?: NetworkInformation;
		connection?: NetworkInformation;
	};

	const conn =
		navConn?.connection ||
		navConn.mozConnection ||
		navConn.webkitConnection;

	if (!conn) return null;

	const type = conn.type || "unknown";
	const effectiveType = conn.effectiveType || "unknown";
	const connectionSpeed = conn.downlink || "unknown";

	return {
		type,
		effectiveType,
		connectionSpeed,
	} as const;
};

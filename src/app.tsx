import { callApi } from "./logic/call";
import { getSystemVersion } from "./logic/methods/system/sysinfo_version";

export const App = () => {
	const sysVersion = callApi(getSystemVersion);

	return (
		<div>
			<h1>Testing stuff in preact</h1>

			{sysVersion.response && (
				<pre>{JSON.stringify(sysVersion.response, null, 2)}</pre>
			)}
		</div>
	);
};

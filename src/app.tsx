import Show from "~/components/core/show";
import { getSystemVersion } from "~/logic/methods/system/sysinfo_version";

export const App = () => {
	const {
		response,
		isLoading,
		enablePolling,
		disablePolling,
		updateResponse,
	} = getSystemVersion();

	const loader = (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				pointerEvents: "none",
			}}
		>
			<code>loading...</code>
		</div>
	);

	return (
		<div>
			<Show isVisible={isLoading} fallback={null}>
				{loader}
			</Show>

			<div style={{ minHeight: 360 }}>
				<Show isVisible={!!response} fallback={loader}>
					<pre>{JSON.stringify(response, null, 2)}</pre>
					<code>
						{response?.systime &&
							`SystemTime: ${Intl.DateTimeFormat(undefined, {
								formatMatcher: "best fit",
								dateStyle: "long",
								timeStyle: "medium",
							}).format(new Date())}`}
					</code>
				</Show>
			</div>

			<button type="button" onClick={() => updateResponse()}>
				Refresh
			</button>
			<button type="button" onClick={() => enablePolling(500)}>
				Enable Polling
			</button>
			<button type="button" onClick={() => disablePolling()}>
				Disable Polling
			</button>
		</div>
	);
};

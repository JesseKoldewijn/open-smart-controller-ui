import { createFileRoute } from "@tanstack/react-router";
import Show from "~/components/core/show";
import { useSystemVersionQuery } from "~/logic/methods/system/sysinfo_version";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data, refetch, isLoading, enablePolling, disablePolling } =
		useSystemVersionQuery();

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
				<pre>{JSON.stringify(data, null, 2)}</pre>
				<code>
					{data?.systime &&
						`SystemTime: ${Intl.DateTimeFormat(undefined, {
							formatMatcher: "best fit",
							dateStyle: "long",
							timeStyle: "medium",
						}).format(new Date())}`}
				</code>
			</div>
			<button type="button" onClick={() => refetch()}>
				refetch
			</button>
			<button type="button" onClick={() => enablePolling()}>
				polling
			</button>
			<button type="button" onClick={() => disablePolling()}>
				stop polling
			</button>
		</div>
	);
}

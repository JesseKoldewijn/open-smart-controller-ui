import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getVersionStoreByIP } from "~/store/selectors/versionStore";

export const Route = createFileRoute("/controller/$ip")({
	loader: async ({ params }) => {
		return {
			ip: params.ip,
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { ip } = Route.useLoaderData();

	const versionData = getVersionStoreByIP(ip);

	if (!versionData) {
		return notFound();
	}

	const dateTimeFormatter = (input: string) => {
		const intl = new Intl.DateTimeFormat("en-US", {
			dateStyle: "medium",
			timeStyle: undefined,
		});

		return intl.format(new Date(input));
	};

	const timeFormatter = (input: string) => {
		const [hours, minutes, seconds] = input.split(":");
		const date = new Date();
		date.setHours(Number(hours));
		date.setMinutes(Number(minutes));
		date.setSeconds(Number(seconds));

		const time = new Date(date);
		const intl = new Intl.DateTimeFormat("en-US", {
			timeStyle: "medium",
		});

		return intl.format(new Date(time));
	};

	return (
		<div className="flex flex-col gap-2 items-center justify-center">
			<h1 className="font-medium text-lg">{ip}</h1>
			<table className="mx-auto md:min-w-sm">
				<tbody className="w-full">
					{Object.entries(versionData.data).map(([key, value]) => {
						switch (key) {
							case "type":
							case "user":
								return null;
							case "date": {
								return (
									<tr
										key={key}
										className="w-full flex first:border-t-0 in-even:border-t py-1 px-2"
									>
										<td className="w-30">{key}</td>
										<td className="w-full text-right">
											{dateTimeFormatter(value)}
										</td>
									</tr>
								);
							}
							case "time": {
								return (
									<tr
										key={key}
										className="w-full flex first:border-t-0 in-even:border-t py-1 px-2"
									>
										<td className="w-30">last-updated</td>
										<td className="w-full text-right">
											{timeFormatter(value)}
										</td>
									</tr>
								);
							}
							default: {
								return (
									<tr
										key={key}
										className="w-full flex first:border-t-0 in-even:border-t py-1 px-2"
									>
										<td className="w-30">{key}</td>
										<td className="w-full text-right">
											{value}
										</td>
									</tr>
								);
							}
						}
					})}
				</tbody>
			</table>

			<Link
				to="/"
				className="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-1 px-3 rounded"
			>
				Back
			</Link>
		</div>
	);
}

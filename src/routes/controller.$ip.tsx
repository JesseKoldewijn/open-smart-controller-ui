import { Link, createFileRoute, notFound } from "@tanstack/react-router";

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
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="text-lg font-medium">{ip}</h1>
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
                    className="flex w-full px-2 py-1 first:border-t-0 in-even:border-t"
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
                    className="flex w-full px-2 py-1 first:border-t-0 in-even:border-t"
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
                    className="flex w-full px-2 py-1 first:border-t-0 in-even:border-t"
                  >
                    <td className="w-30">{key}</td>
                    <td className="w-full text-right">{value}</td>
                  </tr>
                );
              }
            }
          })}
        </tbody>
      </table>

      <Link
        to="/"
        className="rounded bg-neutral-500 px-3 py-1 font-bold text-white hover:bg-neutral-700"
      >
        Back
      </Link>
    </div>
  );
}

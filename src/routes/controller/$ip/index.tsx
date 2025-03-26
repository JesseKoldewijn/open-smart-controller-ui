import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { getVersionStoreByIP } from "~/store/selectors/versionStore";

export const Route = createFileRoute("/controller/$ip/")({
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

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-lg font-medium">{ip}</h1>

        <div className="mx-auto w-full">
          <div className="flex w-full px-2 py-1 first:border-t-0 in-even:border-t">
            <span className="w-full text-center">WIP</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          to="/"
          className="rounded bg-neutral-500 px-3 py-1 font-bold text-white hover:bg-neutral-700"
        >
          Back
        </Link>
        <Link
          to="/controller/$ip/version"
          params={{ ip }}
          className="rounded bg-neutral-500 px-3 py-1 font-bold text-white hover:bg-neutral-700"
        >
          Version
        </Link>
      </div>
    </>
  );
}

import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { useObjectManagerObjects } from "~/logic/methods/object-manager/get_objects";
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
  const objectsData = useObjectManagerObjects(ip);

  if (!versionData) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-lg font-medium">{ip}</h1>

        <div className="mx-auto w-full">
          <div className="flex w-full flex-col gap-2 px-2 py-1 first:border-t-0 in-even:border-t">
            <span className="w-full text-center">
              {objectsData.data?.rv.objects?.length ?? 0} Objects
            </span>
            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {objectsData.data?.rv.objects?.map((object) => {
                return (
                  <div
                    key={object.oid}
                    className="flex flex-col gap-1 rounded-md border p-2"
                  >
                    <span>ID: {object.oid}</span>

                    <span>Driver: {object.driver}</span>
                    <span>Type: {object.type}</span>

                    <Link
                      to="/controller/$ip/$object"
                      params={{
                        ip,
                        object: object.oid,
                      }}
                      className="rounded bg-neutral-500 px-3 py-1 text-center font-bold text-white hover:bg-neutral-700"
                    >
                      Open
                    </Link>
                  </div>
                );
              })}
            </div>
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
    </div>
  );
}

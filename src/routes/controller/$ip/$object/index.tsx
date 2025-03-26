import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import Show from "~/components/core/show";
import { useDatalogGet } from "~/logic/methods/datalog";
import { useObjectManagerObjects } from "~/logic/methods/object-manager/get_objects";
import { getVersionStoreByIP } from "~/store/selectors/versionStore";

export const Route = createFileRoute("/controller/$ip/$object/")({
  loader: async ({ params }) => {
    return {
      ip: params.ip,
      object: params.object,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { ip, object } = Route.useLoaderData();

  const [open, setOpen] = useState(false);

  const [timeOne, setTimeOne] = useState(Math.floor(Date.now() / 1000) - 5000);
  const [timeTwo, setTimeTwo] = useState(Math.floor(Date.now() / 1000) - 1000);

  const versionData = getVersionStoreByIP(ip);
  const { data } = useObjectManagerObjects(ip);
  const _object = data?.rv.objects?.find((o) => o.oid === object);

  const {
    data: datalogData,
    enablePolling,
    disablePolling,
  } = useDatalogGet(ip, {
    arguments: {
      oid: object,
      prop: "usage",
      resolution: 1,
      t1: timeOne,
      t2: timeTwo,
      aggregate: null,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOne((prev) => Math.floor(prev) + 150);
      setTimeTwo((prev) => Math.floor(prev) + 150);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!versionData || !_object) {
    notFound();
  }

  return (
    <Show isVisible={!!datalogData} fallback={null}>
      <div className="flex flex-col items-center justify-center pt-20">
        <div className="flex w-full items-center justify-evenly">
          <button className="cursor-pointer" onClick={() => enablePolling()}>
            Start Polling
          </button>
          <button className="cursor-pointer" onClick={() => disablePolling()}>
            Stop Polling
          </button>
        </div>
        <button onClick={() => setOpen(!open)} className="cursor-pointer">
          {open ? "Hide Data" : "Show Data"}
        </button>
        <Show isVisible={open} fallback={null}>
          <div className="relative flex max-h-50 flex-col overflow-scroll overflow-x-hidden border-t-2 px-8 pt-3">
            {datalogData?.rv.data?.map((x) => (
              <div key={JSON.stringify(x)} className="flex gap-4">
                <span>{x[0]}</span>
                <span>{x[1]}</span>
              </div>
            ))}
          </div>
        </Show>
      </div>
    </Show>
  );
}

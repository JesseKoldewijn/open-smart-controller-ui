import { Link, createFileRoute } from "@tanstack/react-router";

import { networkStore } from "~/store/network";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { ipAddresses } = networkStore.getNetworkClientStore.getState();

  return (
    <>
      {ipAddresses ? (
        ipAddresses.map((ip) => (
          <div
            key={ip}
            className="flex max-w-sm items-center justify-center gap-2 rounded-md border px-3 py-2"
          >
            {ip}
            <Link
              to={`/controller/$ip`}
              params={{
                ip,
              }}
              className="rounded bg-neutral-500 px-3 py-1 font-bold text-white hover:bg-neutral-700"
            >
              Open Controller
            </Link>
          </div>
        ))
      ) : (
        <>No IP addresses in store</>
      )}
    </>
  );
}

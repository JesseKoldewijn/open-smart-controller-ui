import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useState } from "react";

import { getSystemPing } from "~/logic/methods/system/ping";
import { networkStore } from "~/store/network";

type SysPingReturnType = ReturnType<typeof getSystemPing>;

export const UpdateIpForm = () => {
  const [loading, isLoading] = useState<boolean>(true);
  const [parent] = useAutoAnimate();

  const { ipAddresses, setIpAddresses } =
    networkStore.getNetworkClientStore.getState();

  const [addresses, setAddresses] = useState<string[]>([
    ...new Set(ipAddresses),
  ]);

  const [validatedAddresses, setValidatedAddresses] = useState<
    {
      ip: string;
      isController: boolean | null;
    }[]
  >(
    [...new Set(ipAddresses)].map((ip) => ({
      ip,
      isController: null,
    })),
  );

  const [message, setMessage] = useState<string | null>();

  const checkAddresses = async (newIp: string[]) => {
    const ipList = [...new Set([...addresses, ...newIp])];

    const responsePromises = new Set<{
      ip: string;
      promise: SysPingReturnType;
    }>();

    for (const ip of ipList) {
      responsePromises.add({
        ip,
        promise: getSystemPing(ip),
      });
    }

    const results = await Promise.allSettled(
      Array.from(responsePromises).map(({ promise }) => promise),
    );

    const resultsWithIps =
      results.map((result, idx) => ({
        ...result,
        ip: Array.from(responsePromises)[idx].ip,
      })) || [];

    if (results.length === 0) {
      setMessage("No IPs provided");
      isLoading(false);
      return;
    }

    const data = resultsWithIps.map((result) => {
      if (result.status === "fulfilled" && result.value) {
        return {
          ip: result.ip,
          isController: result.value.ok,
        };
      }
    });

    setMessage(null);

    const resultSet = [...new Set(data)].filter((x) => x !== undefined);

    if (resultSet.length === 0) {
      setMessage("No valid IPs provided");
      isLoading(false);
      return;
    }
    setValidatedAddresses(resultSet);

    isLoading(false);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const ip = formData.get("ip") as string;

    console.log(ip);

    if (!ip) return;

    await checkAddresses([ip]);
  };

  useEffect(() => {
    checkAddresses(ipAddresses);
  }, []);

  return (
    <div
      style={{
        opacity: loading ? 0 : 1,
        pointerEvents: loading ? "none" : "auto",
      }}
      className="flex flex-col items-center justify-center gap-4"
    >
      <h1>Update IP</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-2">
        <label htmlFor="ip" className="sr-only">
          IP Address
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            name="ip"
            id="ip"
            className="rounded-md border px-3 py-1"
          />
          <button
            type="submit"
            className="cursor-pointer rounded bg-neutral-500 px-3 py-1 font-bold text-white hover:bg-neutral-700"
          >
            Submit
          </button>
        </div>
      </form>
      <div ref={parent} className="p-4 pt-0">
        {validatedAddresses &&
          validatedAddresses.map((address) => {
            const status =
              address.isController === null
                ? "Unknown"
                : address.isController == true
                  ? "Valid"
                  : "Invalid";

            const isInStore = ipAddresses.includes(address.ip);

            return (
              <div
                key={address.ip}
                className="flex flex-col gap-1 rounded-md border px-3 py-2"
              >
                {address.ip} - {status} -{" "}
                {isInStore ? "In Store" : "Not In Store"}
                <button
                  className="cursor-pointer rounded bg-neutral-500 px-3 py-1 font-bold text-white hover:bg-neutral-700"
                  onClick={() => {
                    if (isInStore) {
                      setIpAddresses(
                        validatedAddresses
                          .filter((ip) => ip.ip !== address.ip)
                          .map((x) => x.ip),
                      );
                      setAddresses(
                        validatedAddresses
                          .filter((ip) => ip.ip !== address.ip)
                          .map((x) => x.ip),
                      );
                      setValidatedAddresses((x) =>
                        x.filter((ip) => ip.ip !== address.ip),
                      );
                    } else {
                      setIpAddresses([...ipAddresses, address.ip]);
                      setAddresses([...ipAddresses, address.ip]);
                      setValidatedAddresses((x) => [
                        ...new Set([
                          ...x.filter((x) => x.ip !== address.ip),
                          { ip: address.ip, isController: null },
                        ]),
                      ]);
                      checkAddresses([address.ip]);
                    }
                  }}
                >
                  {isInStore ? "Remove from" : "Add to"} store
                </button>
              </div>
            );
          })}
      </div>
      {!!message && <>Message: {message}</>}
    </div>
  );
};

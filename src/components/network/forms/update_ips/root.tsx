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

    if (results.length === 0 && validatedAddresses.length < 1) {
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

    const isNewlyValid = data.find((x) => newIp.find((z) => z === x?.ip));

    if (!isNewlyValid) {
      setMessage("IP is not from a live controller");
    } else {
      setMessage(null);
    }

    const resultSet = [...new Set(data)].filter((x) => x !== undefined);

    if (resultSet.length === 0) {
      if (validatedAddresses.length < 1) setMessage("No valid IPs provided");

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
      className="flex h-full w-full flex-col justify-center gap-4"
    >
      <h1 className="mx-auto">Update IP</h1>
      <form onSubmit={submitHandler} className="mx-auto flex flex-col gap-2">
        <label htmlFor="ip" className="sr-only">
          IP Address
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            name="ip"
            id="ip"
            className="rounded-md border px-3 py-1"
            onChange={() => setMessage("")}
          />
          <button
            type="submit"
            className="cursor-pointer rounded bg-neutral-500 px-3 py-1 font-bold text-white hover:bg-neutral-700"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="mx-auto flex min-h-60 w-full max-w-md flex-col items-center gap-2 overflow-x-hidden">
        <div ref={parent} className="flex w-full flex-col p-4 pt-0">
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
                  className="relative flex flex-col gap-1 rounded-md border px-3 py-2"
                >
                  {address.ip} - {status} -{" "}
                  {isInStore ? "In Store" : "Not In Store"}
                  <button
                    className="cursor-pointer rounded bg-neutral-500 px-3 py-1 font-bold text-white hover:bg-neutral-700"
                    onClick={() => {
                      if (isInStore) {
                        const newAddresses = validatedAddresses.filter(
                          (ip) => ip.ip !== address.ip,
                        );

                        setIpAddresses(newAddresses.map((x) => x.ip));
                        setAddresses(newAddresses.map((x) => x.ip));
                        setValidatedAddresses(newAddresses);
                      } else {
                        setIpAddresses([...ipAddresses, address.ip]);
                        setAddresses([...ipAddresses, address.ip]);
                        setValidatedAddresses((_x) => [
                          ...new Set([
                            ..._x.filter((x) => x.ip !== address.ip),
                            {
                              ip: address.ip,
                              isController:
                                address.isController ||
                                _x.find((z) => z.ip === address.ip)
                                  ?.isController ||
                                null,
                            },
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
    </div>
  );
};

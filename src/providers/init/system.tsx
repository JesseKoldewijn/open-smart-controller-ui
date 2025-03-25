import { useEffect } from "react";

import { Time } from "~/lib/utils/time";
import { getSystemVersion } from "~/logic/methods/system/sysinfo_version";
import { networkStore } from "~/store/network";
import { SystemVersionStoreNamespace, systemStore } from "~/store/system";

const SystemInitProvider = ({ children }: { children: React.ReactNode }) => {
  const { setVersionData } = systemStore.getVersionStore.getState();
  const { ipAddresses } = networkStore.getNetworkClientStore.getState();

  useEffect(() => {
    const hasStore = !!localStorage.getItem(SystemVersionStoreNamespace);
    const lastUpdated = localStorage.getItem(
      `${SystemVersionStoreNamespace}>lastUpdated`,
    );
    const now = new Date().getTime();

    const needsUpdate =
      !lastUpdated || now - parseInt(lastUpdated) > Time.getMinutesInMs(15);

    if (!hasStore || needsUpdate) {
      const fetchData = async () => {
        if (!ipAddresses.length) return;
        for (const ip of ipAddresses) {
          const data = await getSystemVersion(ip);
          if (data) {
            setVersionData({
              ip,
              data: data.rv.version,
            });
          }
        }
      };

      fetchData();

      localStorage.setItem(
        `${SystemVersionStoreNamespace}>lastUpdated`,
        now.toString(),
      );
    }
  }, []);

  return children;
};

export default SystemInitProvider;

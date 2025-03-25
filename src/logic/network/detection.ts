import { isIP } from "range_check";

import { networkStore } from "~/store/network";

export const getIpAddresses = () => {
  const { ipAddresses } = networkStore.getNetworkClientStore.getState();

  return ipAddresses || null;
};

export const validateIpAddressesAndRanges = (input?: {
  ipAddresses: string[];
  ipRanges: string[];
}) => {
  const { ipAddresses, ipRanges } = input || {};

  const validIps = new Set<string>();

  const invalidIps = new Set<string>();

  if (ipAddresses) {
    for (const ip of ipAddresses) {
      const isValid = isIP(ip);

      if (isValid) {
        validIps.add(ip);
      } else {
        invalidIps.add(ip);
      }
    }
  }

  const validIpRanges = new Set<string>();
  const invalidIpRanges = new Set<string>();

  if (ipRanges) {
    for (const ipRange of ipRanges) {
      const [start, end] = ipRange.split("-");
      const isValidStart = isIP(start);
      const isValidEnd = isIP(end);

      if (isValidStart && isValidEnd) {
        validIpRanges.add(ipRange);
      } else {
        invalidIpRanges.add(ipRange);
      }
    }
  }

  const hasInvalidIps = invalidIps.size > 0;
  const hasInvalidIpRanges = invalidIpRanges.size > 0;

  return {
    ipAddresses: Array.from(validIps),
    ipAddressRanges: Array.from(validIpRanges),
    hasInvalidIps,
    hasInvalidIpRanges,
    invalidIps: hasInvalidIps ? Array.from(invalidIps) : null,
    invalidIpRanges: hasInvalidIpRanges ? Array.from(invalidIpRanges) : null,
  };
};

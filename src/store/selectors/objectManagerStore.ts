import { objectManagerStore } from "~/store/object_manager";

export const getObjectManagerObjectsByIp = (ip?: string) => {
  if (!ip) return null;
  const { objects } =
    objectManagerStore.getObjectManagerObjectsStore.getState();
  return objects.find((x) => x.ip === ip)?.data ?? null;
};

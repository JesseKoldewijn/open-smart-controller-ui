import SystemInitProvider from "~/providers/init/system";

export const BaseProviders = ({ children }: { children: React.ReactNode }) => {
  return <SystemInitProvider>{children}</SystemInitProvider>;
};

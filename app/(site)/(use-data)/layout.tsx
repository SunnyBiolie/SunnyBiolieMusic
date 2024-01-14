import { DataContextProvider } from "@/hooks/use-data";

interface SitesUseDataLayoutProps {
  children: React.ReactNode;
}

const SitesUseDataLayout = ({ children }: SitesUseDataLayoutProps) => {
  return <DataContextProvider>{children}</DataContextProvider>;
};

export default SitesUseDataLayout;

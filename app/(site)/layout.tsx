import { BoxWrapper } from "@/components/box-wrapper";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex">
      <Sidebar />
      <div className="grow flex flex-col p-2 gap-2">
        <Header />
        <BoxWrapper className="grow">{children}</BoxWrapper>
      </div>
    </div>
  );
};

export default SiteLayout;

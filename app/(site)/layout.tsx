import { BoxWrapper } from "@/components/containers/box-wrapper";
import { Header } from "@/components/containers/header";
import { Sidebar } from "@/components/containers/sidebar";
import { SongController } from "@/components/containers/song-controller";

const SiteLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="grow flex">
        <Sidebar />
        <div className="grow flex flex-col p-2 gap-2">
          <Header />
          <BoxWrapper className="grow overflow-auto">{children}</BoxWrapper>
        </div>
      </div>
      <SongController />
    </div>
  );
};

export default SiteLayout;

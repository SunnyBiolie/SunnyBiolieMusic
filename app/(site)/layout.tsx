import { BoxWrapper } from "@/components/containers/box-wrapper";
import { Header } from "@/components/containers/header";
import { LeftSidebar } from "@/components/containers/left-sidebar";
import { RightSibebar } from "@/components/containers/right-sidebar";
import { SongController } from "@/components/containers/song-controller";
import { CreateCollectionModal } from "@/components/my-ui/create-collection-modal";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CreateCollectionModal />
      <div className="h-screen w-full flex flex-col">
        <div className="grow min-h-[calc(100vh-80px)] max-h-full flex">
          <LeftSidebar />
          <div className="grow shrink min-w-[500px] flex flex-col p-2 gap-2">
            <Header />
            <BoxWrapper className="grow overflow-auto p-0">
              {children}
            </BoxWrapper>
          </div>
          <RightSibebar className="shrink-0" />
        </div>
        <SongController />
      </div>
    </>
  );
};

export default SiteLayout;

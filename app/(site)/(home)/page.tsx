import getAllSong from "@/actions/get-song/all";
import { AllSong } from "./_components/all-song";

const HomePage = async () => {
  // const allSong = await getAllSong();

  return (
    <div>
      <AllSong songs={[]} />
    </div>
  );
};

export default HomePage;

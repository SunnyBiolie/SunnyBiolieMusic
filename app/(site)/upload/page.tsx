"use client";

import { useCallback, useState } from "react";
import { UploadForm } from "./_components/upload-form";
import { PreviewSong } from "./_components/preview-song";

export interface SongPreviewDataProps {
  title?: string;
  authors?: string;
  image?: File;
  song?: File;
}

const UploadPage = () => {
  const [songData, setSongData] = useState<SongPreviewDataProps | null>(null);

  const updateSongPreviewData = useCallback((data: SongPreviewDataProps) => {
    setSongData(data);
  }, []);

  return (
    <div className="flex">
      <div className="grow">
        <UploadForm updatePreviewData={updateSongPreviewData} />
      </div>
      <div className="grow flex justify-center">
        <PreviewSong data={songData} />
      </div>
    </div>
  );
};

export default UploadPage;

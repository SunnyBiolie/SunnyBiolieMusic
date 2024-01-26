"use client";

import { useParams } from "next/navigation";

const CollectionPage = () => {
  const params = useParams();

  return <div className="p-4">Collections: {params.collectionId}</div>;
};

export default CollectionPage;

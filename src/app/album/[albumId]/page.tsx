import SingleAlbumView from "@/components/SingleAlbumView";
import React from "react";

export default function Page({
  params,
}: {
  params: Promise<{ albumId: number }>;
}) {
  const { albumId } = React.use(params);
  return (
    <div>
      <SingleAlbumView albumId={albumId} />
    </div>
  );
}

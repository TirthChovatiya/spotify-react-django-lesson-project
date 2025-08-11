import React from 'react';
import Skeleton from '@mui/material/Skeleton';

// This component is used to show a skeleton when the data is loading

export default function HorizontalPlaylistSceleton() {
  return (
    <div className="h-24 flex gap-x-3 bg-zinc-700 duration-500 cursor-pointer rounded-lg">
      <Skeleton variant="rounded" width="100%" height="100%" />
    </div>
  );
}

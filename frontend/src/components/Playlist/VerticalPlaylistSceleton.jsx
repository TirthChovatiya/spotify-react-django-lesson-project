import React from 'react';
import Skeleton from '@mui/material/Skeleton';

// This component is used to show a skeleton when the data is loading
export default function VerticalPlaylistSceleton() {
  return (
    <div className="rounded-lg bg-neutral-600/70 hover:bg-neutral-600/50 duration-300 flex flex-col gap-y-2 text-white cursor-pointer h-80">
      <Skeleton variant="rounded" width="100%" height="100%" />
    </div>
  );
}

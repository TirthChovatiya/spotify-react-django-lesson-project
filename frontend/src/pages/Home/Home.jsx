import React, { useState, useEffect } from 'react';
import { getLikedPlaylists, getPlaylists } from '../../api/songApi';
import HorizontalPlaylist from '../../components/Playlist/HorizontalPlaylist';
import HorizontalPlaylistSceleton from '../../components/Playlist/HorizontalPlaylistSceleton';
import VerticalPlaylist from '../../components/Playlist/VerticalPlaylist';
import VerticalPlaylistSceleton from '../../components/Playlist/VerticalPlaylistSceleton';
import { useAppSelector } from '../../store/reduxhooks';

export default function Home() {
  const [likedPlaylists, setLikedPlaylists] = useState();
  const [playlists, setPlaylists] = useState([]);
  const authStatus = useAppSelector(state => state.auth.authStatus);

  // Fetch liked and new playlists after auth status is confirmed
  useEffect(() => {
    if (authStatus === 'notChecked') return;

    getLikedPlaylists().then(response => {
      setLikedPlaylists(response.data);
    });

    getPlaylists().then(response => {
      setPlaylists(response.data);
    });
  }, [authStatus]);

  return (
    <div className='p-5'>
      <div className='text-white font-bold text-3xl mb-3'>Good Days</div>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10'>
        {likedPlaylists ? (
          <>
            {likedPlaylists.map(playlist => (
              <HorizontalPlaylist key={playlist.id} playlist={playlist} />
            ))}
          </>
        ) : (
          <>
            <HorizontalPlaylistSceleton />
            <HorizontalPlaylistSceleton />
            <HorizontalPlaylistSceleton />
          </>
        )}
      </div>

      <div className='text-white font-bold text-3xl mb-3'>New Playlists</div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
        {playlists.length ? (
          playlists.map(playlist => (
            <VerticalPlaylist key={playlist.id} playlist={playlist} />
          ))
        ) : (
          <>
            <VerticalPlaylistSceleton />
            <VerticalPlaylistSceleton />
            <VerticalPlaylistSceleton />
            <VerticalPlaylistSceleton />
            <VerticalPlaylistSceleton />
            <VerticalPlaylistSceleton />
          </>
        )}
      </div>
    </div>
  );
}

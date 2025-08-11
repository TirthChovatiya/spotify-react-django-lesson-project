import React, { useCallback } from 'react';
import VerticalPlaylist from '../../components/Playlist/VerticalPlaylist';
import SongList from '../../components/Song/SongList';
import { useAppDispatch } from '../../store/reduxhooks';
import { changePlaylistAndSongAction } from '../../store/slices/playlistSlice';

export default function SearchList({ songPlaylist, playlists }) {
  const dispatch = useAppDispatch();

  const changeSongHandler = useCallback((song) => {
    dispatch(changePlaylistAndSongAction({ song: song, playlist: songPlaylist }));
  }, [dispatch, songPlaylist]);

  return (
    <div>
      <div className="text-4xl text-white font-bold mb-4">Songs</div>
      <div className="mb-10">
        <SongList songs={songPlaylist.songs} onChangeSong={changeSongHandler} />
      </div>
      <div className="text-4xl text-white font-bold mb-5">Playlist</div>
      <div className="grid grid-cols-5 gap-5">
        {playlists.map((playlist) => (
          <VerticalPlaylist playlist={playlist} key={playlist.id} />
        ))}
      </div>
    </div>
  );
}

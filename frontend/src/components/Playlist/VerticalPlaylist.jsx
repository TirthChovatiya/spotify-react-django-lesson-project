import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlaylistDetail } from '../../api/songApi';
import { useAppDispatch } from '../../store/reduxhooks';
import { setPlaylistAction } from '../../store/slices/playlistSlice';
import PlayButton from '../UI/PlayButton';

export default function VerticalPlaylist({ playlist }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Play playlist and stop navigation
  const clickHandler = useCallback((e) => {
    e.stopPropagation();
    getPlaylistDetail(playlist.id).then(res => {
      dispatch(setPlaylistAction({ playlist: res.data }));
    });
  }, [dispatch, playlist.id]);

  // Navigate to playlist page
  const playlistClickHandler = useCallback(() => {
    navigate(`/playlists/${playlist.id}/`);
  }, [navigate, playlist.id]);

  return (
    <div onClick={playlistClickHandler} className="rounded-lg p-4 bg-neutral-600/70 hover:bg-neutral-600/50 duration-300 flex flex-col gap-y-2 text-white cursor-pointer">
      <div className="relative">
        <img className="w-full h-56 rounded-lg object-cover" src={playlist.image} alt="" />
        <PlayButton className="absolute bottom-2 right-1" onClick={clickHandler} />
      </div>
      <div className="font-bold text-xl">{playlist.title}</div>
      <div>{playlist.author.first_name} {playlist.author.last_name}</div>
    </div>
  );
}

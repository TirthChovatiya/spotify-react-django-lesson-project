import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlaylistDetail } from '../../api/songApi';
import { useAppDispatch } from '../../store/reduxhooks';
import { setPlaylistAction } from '../../store/slices/playlistSlice';
import PlayButton from '../UI/PlayButton';

export default function HorizontalPlaylist({ playlist }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Play playlist when play button is clicked (stop propagation to avoid navigation)
  const clickHandler = useCallback((e) => {
    e.stopPropagation();
    getPlaylistDetail(playlist.id).then((res) => {
      dispatch(setPlaylistAction({ playlist: res.data }));
    });
  }, [dispatch, playlist.id]);

  // Navigate to playlist page
  const playlistClickHandler = useCallback(() => {
    navigate(`/playlists/${playlist.id}/`);
  }, [navigate, playlist.id]);

  return (
    <div
      onClick={playlistClickHandler}
      className="h-24 flex gap-x-3 bg-emerald-200/30 hover:bg-emerald-400/40 duration-500 cursor-pointer rounded-lg"
    >
      <div className="h-full">
        <img
          width={96}
          className="h-full rounded-l-lg object-cover"
          src={playlist.image}
          alt=""
        />
      </div>
      <div className="grow h-full flex flex-wrap content-center text-white font-bold text-xl">
        <div>{playlist.title}</div>
      </div>
      <div className="flex flex-wrap content-center">
        <PlayButton onClick={clickHandler} />
      </div>
    </div>
  );
}

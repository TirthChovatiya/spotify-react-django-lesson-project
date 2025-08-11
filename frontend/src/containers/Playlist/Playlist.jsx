import React, { useCallback } from 'react';
import PlayButton from '../../components/UI/PlayButton';
import LikeButton from '../../components/UI/LikeButton';
import SongList from '../../components/Song/SongList';
import { useAppDispatch } from '../../store/reduxhooks';
import { changePlaylistAndSongAction } from '../../store/slices/playlistSlice';

export default function Playlist(props) {
  const dispatch = useAppDispatch();

  const playSongHandler = useCallback((song) => {
    dispatch(changePlaylistAndSongAction({ song, playlist: props.playlist }));
  }, [dispatch, props.playlist]);

  return (
    <div className='p-10'>
      <div className='flex gap-5'>
        <div>
          <img
            className='h-full w-60 object-cover shadow-2xl shadow-slate-400/80'
            src={props.image}
            alt={props.title}
          />
        </div>
        <div className='flex flex-col text-white justify-end'>
          <div className='font-bold pb-5'>{props.playlistType.toUpperCase()}</div>
          <div className='text-8xl font-bold pb-10'>{props.title}</div>
          {props.artists && <div>{props.artists}</div>}
          <div className='aaaa'>{props.durations}</div>
        </div>
      </div>

      <div className='mt-10'>
        <div className='flex align-baseline gap-5'>
          <PlayButton onClick={props.playPlaylist} />
          {props.hasLikeButton && (
            <LikeButton
              styles={{ fontSize: 50, color: 'white' }}
              onClick={props.toggleLikePlaylist}
              liked={props.playlist.liked}
            />
          )}
        </div>
        <div>
          <SongList songs={props.songs} onChangeSong={playSongHandler} />
        </div>
      </div>
    </div>
  );
}

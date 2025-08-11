import React, { useState, useMemo, useCallback, useEffect } from 'react';
import LikeButton from '../UI/LikeButton';
import PlayButton from '../UI/PlayButton';
import { useAppDispatch, useAppSelector } from '../../store/reduxhooks';
import classNames from 'classnames';
import { likeSong, unlikeSong } from '../../api/songApi';
import { Link } from 'react-router-dom';
import { setPlayerSongLikedStatus, toggleAudioIsPlaying } from '../../store/slices/playerSlice';

export default function SongItem({ index, song, onPlay }) {
  const [liked, setLiked] = useState(song.liked);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);

  const dispatch = useAppDispatch();
  const playerState = useAppSelector(state => state.player);
  const isThisSongPlaying = playerState.songId === song.id;

  const duration = useMemo(() => {
    const minutes = Math.floor(song.duration / 60);
    const seconds = song.duration % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }, [song.duration]);

  const likeSongHandler = useCallback(() => {
    if (liked) {
      unlikeSong(song.id).then(() => {
        setLiked(false);
        if (isThisSongPlaying) dispatch(setPlayerSongLikedStatus(false));
      });
    } else {
      likeSong(song.id).then(() => {
        setLiked(true);
        if (isThisSongPlaying) dispatch(setPlayerSongLikedStatus(true));
      });
    }
  }, [song.id, dispatch, isThisSongPlaying, liked]);

  const playSongHandler = useCallback(() => {
    if (isThisSongPlaying) {
      dispatch(toggleAudioIsPlaying(null));
    } else {
      onPlay();
    }
  }, [isThisSongPlaying, onPlay, dispatch]);

  useEffect(() => {
    if (isThisSongPlaying) {
      setLiked(playerState.songLiked);
      setCurrentlyPlaying(playerState.audioIsPlaying);
    } else {
      setCurrentlyPlaying(false);
    }
  }, [playerState.songLiked, playerState.audioIsPlaying, isThisSongPlaying]);

  return (
    <div
      className={classNames(
        'grid grid-cols-12 text-white p-4 items-center duration-100 hover:bg-emerald-200/20',
        { 'bg-emerald-200/20': currentlyPlaying }
      )}
    >
      <div className="col-span-6 flex flex-wrap items-center gap-x-3 grid-cols-12">
        <div className="text-xl font-bold">{index}</div>
        <img className="w-14 h-14" src={song.image} alt="" />
        <div>
          <div className="text-lg font-bold">{song.title}</div>
          <div className="text-sm">
            {song.artists &&
              song.artists.map(artist => (
                <Link to={`/artists/${artist.id}`} key={artist.id}>
                  <span className="text-sm hover:underline">
                    {artist.first_name} {artist.last_name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="col-span-3">{song.genres.join(', ')}</div>
      <div className="col-span-1">
        <LikeButton liked={liked} styles={{ color: 'white' }} onClick={likeSongHandler} />
      </div>
      <div className="col-span-1">{duration}</div>
      <div className="col-span-1">
        <PlayButton color="text-white" onClick={playSongHandler} isPlaying={currentlyPlaying} />
      </div>
    </div>
  );
}

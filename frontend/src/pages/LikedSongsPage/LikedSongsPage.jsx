import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getLikedSongs } from '../../api/songApi';
import { useAppDispatch } from '../../store/reduxhooks';
import likeImage from '../../assets/images/like.webp';
import Playlist from '../../containers/Playlist/Playlist';
import { getArtistName, getSongsDuration } from '../../shared/utils/playlist-utils';
import { setPlaylistAction } from '../../store/slices/playlistSlice';

export default function LikedSongsPage() {
  const [likedSongsPlaylist, setLikedSongsPlaylist] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getLikedSongs().then(response => {
      const songs = response.data;
      const playlist = {
        id: 0,
        title: 'Liked Songs',
        image: likeImage,
        color: 'purple',
        featured: false,
        hide: false,
        songs: songs,
        liked: false
      };
      setLikedSongsPlaylist(playlist);
    });
  }, []);

  const [artists, durations] = useMemo(() => {
    if (!likedSongsPlaylist) return ['', ''];
    const songs = likedSongsPlaylist.songs;
    return [getArtistName(songs), getSongsDuration(songs)];
  }, [likedSongsPlaylist]);

  const playPlaylistHandler = useCallback(() => {
    dispatch(setPlaylistAction({ playlist: likedSongsPlaylist }));
  }, [dispatch, likedSongsPlaylist]);

  return (
    <>
      {likedSongsPlaylist && (
        <Playlist
          image={likedSongsPlaylist.image}
          playlistType="Playlist"
          title={likedSongsPlaylist.title}
          artists={artists}
          durations={durations}
          playPlaylist={playPlaylistHandler}
          hasLikeButton={false}
          songs={likedSongsPlaylist.songs}
          playlist={likedSongsPlaylist}
        />
      )}
    </>
  );
}

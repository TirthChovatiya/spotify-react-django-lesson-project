import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAppDispatch } from '../../store/reduxhooks';
import { getArtistDetail } from '../../api/songApi';
import { useParams } from 'react-router-dom';
import { getSongsDuration } from '../../shared/utils/playlist-utils';
import { setPlaylistAction } from '../../store/slices/playlistSlice';
import Playlist from '../../containers/Playlist/Playlist';
import { followArtist, unfollowArtist } from '../../api/authApi';

export default function ArtistPage() {
  const [artistPlaylist, setArtistPlaylist] = useState(null);

  const dispatch = useAppDispatch();
  const { artistId } = useParams();

  useEffect(() => {
    getArtistDetail(artistId).then((response) => {
      const artist = response.data;
      const songs = artist.songs;
      const playlist = {
        id: artist.id,
        title: artist.first_name + ' ' + artist.last_name,
        image: artist.image,
        color: 'purple',
        featured: false,
        hide: false,
        songs: songs,
        liked: artist.is_following,
      };
      setArtistPlaylist(playlist);
    });
  }, [artistId]);

  const toggleFollowHandler = useCallback(() => {
    if (artistPlaylist) {
      if (artistPlaylist.liked) {
        unfollowArtist(artistPlaylist.id).then(() => {
          setArtistPlaylist((prev) => ({
            ...prev,
            liked: false,
          }));
        });
      } else {
        followArtist(artistPlaylist.id).then(() => {
          setArtistPlaylist((prev) => ({
            ...prev,
            liked: true,
          }));
        });
      }
    }
  }, [artistPlaylist]);

  const durations = useMemo(() => {
    if (!artistPlaylist) return '';
    return getSongsDuration(artistPlaylist.songs);
  }, [artistPlaylist]);

  const playPlaylistHandler = useCallback(() => {
    dispatch(setPlaylistAction({ playlist: artistPlaylist }));
  }, [dispatch, artistPlaylist]);

  return (
    <>
      {artistPlaylist && (
        <Playlist
          image={artistPlaylist.image}
          playlistType="Artist"
          title={artistPlaylist.title}
          durations={durations}
          playPlaylist={playPlaylistHandler}
          toggleLikePlaylist={toggleFollowHandler}
          hasLikeButton={true}
          songs={artistPlaylist.songs}
          playlist={artistPlaylist}
        />
      )}
    </>
  );
}

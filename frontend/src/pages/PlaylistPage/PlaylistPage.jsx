import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistDetail, likePlaylist, unlikePlaylist } from '../../api/songApi';
import { useAppDispatch } from '../../store/reduxhooks';
import { setPlaylistAction } from '../../store/slices/playlistSlice';
import Playlist from '../../containers/Playlist/Playlist';
import { getSongsDuration, getArtistName } from '../../shared/utils/playlist-utils';

export default function PlaylistPage(props) {
  const [playlistDetail, setPlaylistDetail] = React.useState(null);

  const { id } = useParams();

  const dispatch = useAppDispatch();

  // get artists and durations as readable string
  const [artists, durations] = React.useMemo(() => {
    if (!playlistDetail) return ['', ''];
    const songs = playlistDetail.songs;
    return [getArtistName(songs), getSongsDuration(songs)];
  }, [playlistDetail]);

  // get playlist detail
  React.useEffect(() => {
    if (!id) return;
    getPlaylistDetail(+id).then(response => {
      setPlaylistDetail(response.data);
    });
  }, [id]);

  // play playlist
  const playPlaylistHandler = React.useCallback(() => {
    if (playlistDetail) {
      dispatch(setPlaylistAction({ playlist: playlistDetail }));
    }
  }, [dispatch, playlistDetail]);

  // like playlist if not liked, unlike if liked
  const likePlaylistHandler = React.useCallback(() => {
    if (!playlistDetail) return;
    if (playlistDetail.liked) {
      unlikePlaylist(playlistDetail.id).then(() => {
        setPlaylistDetail(prev => ({ ...prev, liked: false }));
      });
    } else {
      likePlaylist(playlistDetail.id).then(() => {
        setPlaylistDetail(prev => ({ ...prev, liked: true }));
      });
    }
  }, [playlistDetail]);

  return (
    playlistDetail && (
      <Playlist
        image={playlistDetail.image}
        playlistType="Playlist"
        title={playlistDetail.title}
        artists={artists}
        durations={durations}
        playPlaylist={playPlaylistHandler}
        toggleLikePlaylist={likePlaylistHandler}
        hasLikeButton={true}
        songs={playlistDetail.songs}
        playlist={playlistDetail}
      />
    )
  );
}

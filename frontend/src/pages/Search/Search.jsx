import * as React from 'react';
import GenreList from '../../containers/Search/GenreList';
import SearchList from '../../containers/Search/SearchList.jsx';
import { getGenreList, searchSongs, searchPlaylists } from '../../api/songApi';
import { useParams } from 'react-router-dom';

export default function Search(props) {
  const [genres, setGenres] = React.useState([]);
  // the query from url. It will be updated when user write something in search bar
  const { query } = useParams();
  const [findedSongsPlaylist, setFindedSongsPlaylist] = React.useState(null);
  const [findedPlaylists, setFindedPlaylists] = React.useState([]);

  // search songs and playlists
  const search = React.useCallback((query) => {
    (async () => {
      const newFindedPlaylists = await searchPlaylists(query);
      const songsResult = await searchSongs(query);
      setFindedPlaylists(newFindedPlaylists.data);
      // create a dummy playlist for found songs
      const newFindedSongsPlaylist = {
        id: 0,
        title: 'Search Result',
        songs: songsResult.data,
      };
      setFindedSongsPlaylist(newFindedSongsPlaylist);
    })();
  }, []);

  // search after 1.5s when user stops typing
  const currentSearchQuery = { value: query };
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (query && currentSearchQuery.value === query) {
        search(query);
      }
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [query, currentSearchQuery.value, search]);

  // get genre list
  React.useEffect(() => {
    getGenreList().then((res) => {
      setGenres(res.data);
    });
  }, []);

  // if there is a query, show search result, otherwise show genre list
  const contentJSX = React.useMemo(() => {
    if (query) {
      if (findedSongsPlaylist) {
        return (
          <SearchList songPlaylist={findedSongsPlaylist} playlists={findedPlaylists} />
        );
      }
    } else {
      return <GenreList genres={genres} />;
    }
  }, [genres, findedPlaylists, findedSongsPlaylist, query]);

  return <div className="p-10">{contentJSX}</div>;
}

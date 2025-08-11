import React, { useEffect, useState, useCallback } from 'react';
import SongLIst from '../../components/Song/SongList';
import { useParams } from 'react-router-dom';
import { getGenreDetail } from '../../api/songApi';
import { useAppDispatch } from '../../store/reduxhooks';
import { changePlaylistAndSongAction } from '../../store/slices/playlistSlice';


// utils/genreColors.js
export const genreColorMap = {
  Pop: 'bg-pink-500',
  Rock: 'bg-gray-600',
  Jazz: 'bg-yellow-500',
  Classical: 'bg-blue-500',
  HipHop: 'bg-green-500',
  EDM: 'bg-purple-500',
  Indie: 'bg-red-500',
  Default: 'bg-gray-300',
};

export default function GenrePage() {
    const [genreDetail, setGenreDetail] = useState();
    const [genrePlaylist, setGenrePlaylist] = useState();

    const { genreId } = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!genreId) return;

        getGenreDetail(genreId).then((res) => {
            setGenreDetail(res.data);
            // create a dummy playlist for songs in genre
            const newGenrePlaylist = {
                id: 0,
                title: res.data.title,
                songs: res.data.songs,
                liked: false,
            };
            setGenrePlaylist(newGenrePlaylist);
        });
    }, [genreId]);

    const playSongHandler = useCallback((song) => {
        if (genrePlaylist) {
            dispatch(changePlaylistAndSongAction({ song, playlist: genrePlaylist }));
        }
    }, [dispatch, genrePlaylist]);

    return (
        <div className='p-10'>
            <div className='text-7xl text-white font-bold mb-10'>
                {genreDetail?.title || ''}
            </div>
            {genreDetail?.songs && (
                <SongLIst songs={genreDetail.songs} onChangeSong={playSongHandler} />
            )}
        </div>
    );
}

import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SongItem from './SongItem';

export default function SongList(props) {
    return (
        <div>
            <div className='grid grid-cols-12 text-white bg-stone-900 p-4'>
                <div className='col-span-6 grid grid-cols-12'>
                    <div className='col-span-3'># Title</div>
                </div>
                <div className='col-span-4'>Genres</div>
                <div className='col-span-1'>
                    <AccessTimeIcon />
                </div>
            </div>
            <div>
                {props.songs.map((song, index) => (
                    <SongItem
                        key={song.id}
                        index={index + 1}
                        song={song}
                        onPlay={() => props.onChangeSong(song)}
                    />
                ))}
            </div>
        </div>
    );
}

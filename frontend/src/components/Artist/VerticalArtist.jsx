import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerticalArtist({ artist }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/artists/${artist.id}`)}
      className='flex flex-col rounded-lg p-6 bg-neutral-700/70 hover:bg-neutral-600/50 duration-300 cursor-pointer'
    >
      <div className='flex justify-center'>
        <img
          style={{ width: 150, height: 150 }}
          className='rounded-full object-cover object-center'
          src={artist.image}
          alt=""
        />
      </div>
      <div className='text-white font-bold text-lg mt-3'>
        {artist.first_name} {artist.last_name}
      </div>
      <div className='text-white'>Artist</div>
    </div>
  );
}

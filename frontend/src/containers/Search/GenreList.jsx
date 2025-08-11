import React from 'react';
import { useNavigate } from 'react-router-dom';

const genreGradientMap = {
  Pop: 'from-pink-500 via-red-400 to-yellow-300',
  Rock: 'from-gray-800 via-gray-600 to-gray-400',
  Jazz: 'from-yellow-300 via-orange-400 to-pink-500',
  Classical: 'from-blue-700 via-indigo-500 to-purple-400',
  HipHop: 'from-green-500 via-teal-400 to-yellow-200',
  EDM: 'from-purple-500 via-pink-400 to-red-300',
  Indie: 'from-red-500 via-yellow-400 to-green-300',
  Default: 'from-gray-400 via-gray-500 to-gray-600',
};

export default function GenreList({ genres }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-7xl text-white font-bold mb-5">Genres</div>
      <div className="flex gap-6 flex-wrap">
        {genres.map((genre) => {
          const gradient =
            genreGradientMap[genre.title] || genreGradientMap.Default;
          return (
            <div
              key={genre.id}
              className={`w-60 h-60 rounded-xl p-4 cursor-pointer hover:scale-105 duration-300 flex items-end text-white bg-gradient-to-br ${gradient}`}
              onClick={() => navigate(`/genres/${genre.id}`)}
            >
              <div className="text-3xl font-bold">{genre.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

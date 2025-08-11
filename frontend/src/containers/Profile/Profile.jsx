import React, { useState, useEffect } from 'react';
import { getProfile } from '../../api/authApi';
import VerticalArtist from '../../components/Artist/VerticalArtist';
import VerticalPlaylist from '../../components/Playlist/VerticalPlaylist';
import ProfilePhoto from '../../components/Profile/ProfilePhoto';
import ImageUploadModal from '../../components/Profile/ImageUploadModal';
import { useAppSelector } from '../../store/reduxhooks';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');

  const authInfo = useAppSelector(state => state.auth.authInfo);

  const isThisUser = profile && profile.user_id === authInfo.user_id;

  useEffect(() => {
    getProfile().then(res => {
      setProfile(res.data);
      setProfilePhoto(res.data.image);
    });
  }, []);

  const changeProfilePhoto = (image) => {
    setProfilePhoto(image);
  };

  if (!profile) return null;

  return (
    <div className="p-10">
      <ImageUploadModal
        changeProfilePhoto={changeProfilePhoto}
        open={open}
        onClose={() => setOpen(false)}
      />
      <div className="flex gap-10 mb-10">
        <ProfilePhoto
          image={profilePhoto}
          editable={isThisUser}
          edit={() => setOpen(true)}
        />
        <div className="flex flex-col justify-end text-white">
          <div>Profile</div>
          <div className="mb-9 mt-2 text-8xl font-bold">
            {profile.first_name} {profile.last_name}
          </div>
          <div>{profile.playlists.length} playlists</div>
        </div>
      </div>

      <div>
        <div className="text-3xl text-white font-bold">Followed Artists</div>
        <div className="grid grid-cols-5 gap-7 py-5">
          {profile.followed_artists.map((artist) => (
            <VerticalArtist artist={artist} key={artist.id} />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="text-3xl text-white font-bold">Public Playlists</div>
        <div className="grid grid-cols-5 py-5 gap-5">
          {profile.playlists.map((playlist) => (
            <VerticalPlaylist playlist={playlist} key={playlist.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

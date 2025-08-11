import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import profilePhoto from '../../assets/images/profile-photo.webp';

export default function ProfilePhoto({ editable, image, onClick, edit }) {
  return (
    <div className="relative">
      <img className="w-52 h-52 object-cover rounded-full" src={image || profilePhoto} alt="" />
      {editable && (
        <div
          onClick={edit}
          className="absolute left-0 top-0 w-full h-full bg-slate-500 bg-opacity-50
           rounded-full flex justify-center items-center opacity-0 hover:opacity-100 
           duration-700 cursor-pointer"
        >
          <EditIcon style={{ fontSize: 80 }} className="opacity-70" />
        </div>
      )}
    </div>
  );
}

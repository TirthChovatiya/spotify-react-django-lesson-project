import React from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function ProfileDropDown() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToProfile = () => {
    navigate('/profile');
  };

  return (
    <div>
      <Button
        sx={{
          mr: 2,
          backgroundColor: '#9c27b0',
          '&:hover': {
            backgroundColor: '#7b1fa2',
          },
        }}
        onClick={navigateToProfile}
        variant="contained"
      >
        Profile
      </Button>

      <Button
        sx={{
          backgroundColor: '#9c27b0',
          '&:hover': {
            backgroundColor: '#7b1fa2',
          },
        }}
        onClick={() => dispatch(logoutAction())}
        variant="contained"
      >
        Logout
      </Button>
    </div>
  );
}

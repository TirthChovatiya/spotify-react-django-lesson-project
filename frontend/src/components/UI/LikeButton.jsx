import React from 'react';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function LikeButton(props) {
  return (
    <div className={props.className}>
      <IconButton
        aria-label="favorite"
        size="large"
        onClick={props.onClick}
        sx={{
          color: props.liked ? '#9c27b0' : '#9c27b0', // Purple for both states
          '&:hover': {
            color: '#7b1fa2', // Darker purple on hover
          },
        }}
      >
        {props.liked ? (
          <FavoriteIcon fontSize="inherit" />
        ) : (
          <FavoriteBorderIcon fontSize="inherit" />
        )}
      </IconButton>
    </div>
  );
}

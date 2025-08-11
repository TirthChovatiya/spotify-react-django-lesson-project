import React, { useCallback } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Slider from '@mui/material/Slider';
import { useAppDispatch, useAppSelector } from '../../store/reduxhooks';
import { setVolume } from '../../store/slices/playerSlice';

export default function VolumeControl() {
  const playerState = useAppSelector(state => state.player);
  const dispatch = useAppDispatch();

  const volumeChangeHandler = useCallback((e, value) => {
    dispatch(setVolume((value) / 100));
  }, [dispatch]);

  return (
    <div className='flex items-center w-48 gap-5'>
      <VolumeUpIcon style={{ color: 'white' }} />
      <Slider
        value={playerState.audioVolume * 100}
        onChange={volumeChangeHandler}
        aria-label="Default"
        valueLabelDisplay="off"
        size="small"
      />
    </div>
  );
}

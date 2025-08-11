import { Slider } from '@mui/material';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import PlayButton from '../UI/PlayButton';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from '../../store/reduxhooks';
import { setAudioIsPlaying, toggleAudioIsPlaying } from '../../store/slices/playerSlice';
import { selectBeforeSong, selectNextSong } from '../../store/slices/playlistSlice';

export default function Player() {
   const [sliderValue, setSliderValue] = useState(0);
   const [audioIsLoaded, setAudioIsLoaded] = useState(false);
   const audioRef = useRef(null);

   const playerState = useAppSelector(state => state.player);
   const dispatch = useAppDispatch();

   useEffect(() => {
      const audio = audioRef.current;
      if (!audio || !playerState.audioSrc) return;
      audio.src = playerState.audioSrc;
      audio.load();
      setAudioIsLoaded(true);
      if (!playerState.shouldPlay) return;
      audio.play();
      dispatch(setAudioIsPlaying(true));
      audio.ontimeupdate = () => {
         const duration = audio.duration;
         const currentTime = audio.currentTime;
         const progress = (currentTime / duration) * 100;
         setSliderValue(progress);
      };
      audio.onended = () => {
         dispatch(selectNextSong());
      };
   }, [playerState.audioSrc, playerState.shouldPlay, dispatch]);

   useEffect(() => {
      const audio = audioRef.current;
      if (!audio || !playerState.audioSrc) return;
      audio.volume = playerState.audioVolume;
   }, [playerState.audioVolume, playerState.audioSrc]);

   useEffect(() => {
      const audio = audioRef.current;
      if (!audio || !audioIsLoaded) return;
      if (playerState.audioIsPlaying) {
         audio.play();
      } else {
         audio.pause();
      }
   }, [playerState.audioIsPlaying, audioIsLoaded]);

   const playHandler = useCallback(() => {
      dispatch(toggleAudioIsPlaying(null));
   }, [dispatch]);

   const beforeHandler = useCallback(() => {
      dispatch(selectBeforeSong());
   }, [dispatch]);

   const nextHandler = useCallback(() => {
      dispatch(selectNextSong());
   }, [dispatch]);

   const playerSliderHandler = useCallback((e, value) => {
      setSliderValue(value);
      const duration = audioRef.current.duration;
      const currentTime = (value * duration) / 100;
      audioRef.current.currentTime = currentTime;
   }, []);

   useEffect(() => {
      const keyPressPlayerControl = (e) => {
         if (e.code === 'Space') {
            playHandler();
         } else if (e.code === 'ArrowLeft') {
            audioRef.current.currentTime -= 5;
         } else if (e.code === 'ArrowRight') {
            audioRef.current.currentTime += 5;
         }
      };
      document.addEventListener('keydown', keyPressPlayerControl);
      return () => {
         document.removeEventListener('keydown', keyPressPlayerControl);
      };
   }, [dispatch, playHandler]);

   return (
      <div className='w-full'>
         <audio ref={audioRef} src="" className='none'></audio>
         <div className='flex justify-center'>
            <IconButton size="large" style={{ fontSize: 40, color: 'white' }} onClick={beforeHandler}>
               <FastRewindIcon fontSize="inherit" />
            </IconButton>
            <PlayButton color='text-white' onClick={playHandler} isPlaying={playerState.audioIsPlaying} />
            <IconButton size="large" style={{ fontSize: 40, color: 'white' }} onClick={nextHandler}>
               <FastForwardIcon fontSize="inherit" />
            </IconButton>
         </div>
         <div>
            <Slider
               size="small"
               value={sliderValue || 0}
               aria-label="Small"
               valueLabelDisplay="off"
               onChange={playerSliderHandler}
            />
         </div>
      </div>
   );
}

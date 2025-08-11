import { createSlice } from "@reduxjs/toolkit";

// player for playing song is managed from here

const initialState = {
  songId: 0,
  songImage: "",
  songTitle: "",
  songArtists: [],
  audioSrc: "",
  audioDuration: 0,
  audioCurrentTime: 0,
  audioVolume: 1,
  audioIsPlaying: false,
  shouldPlay: false,
  songLiked: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setNewAudio: (state, action) => {
      state.audioSrc = action.payload.song.audio;
      state.songImage = action.payload.song.image;
      state.songTitle = action.payload.song.title;
      state.songArtists = action.payload.song.artists;
      state.songLiked = action.payload.song.liked;
      state.songId = action.payload.song.id;
      state.shouldPlay = action.payload.play;
    },

    setAudioIsPlaying: (state, action) => {
      state.audioIsPlaying = action.payload;
    },
    toggleAudioIsPlaying: (state) => {
      state.audioIsPlaying = !state.audioIsPlaying;
    },
    // set audio volume
    setVolume(state, action) {
      state.audioVolume = action.payload;
    },
    setPlayerSongLikedStatus(state, action) {
      state.songLiked = action.payload;
    },
  },
});

export const {
  setNewAudio,
  toggleAudioIsPlaying,
  setAudioIsPlaying,
  setVolume,
  setPlayerSongLikedStatus,
} = playerSlice.actions;

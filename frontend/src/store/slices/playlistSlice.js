import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getPlaylistDetail, likeSong, unlikeSong } from "../../api/songApi";
import { setNewAudio, setPlayerSongLikedStatus } from "./playerSlice";

// The currently playing playlist managing from here

const initialState = {
  currentSongId: -1,
  currentSongIndex: -1,
  playlist: {
    id: 0,
    author: {
      id: 0,
      first_name: "",
      last_name: "",
      username: "",
      image: "",
    },
    title: "",
    image: "",
    color: "",
    featured: false,
    updated: "",
    created: "",
    hide: false,
    songs: [],
    liked: false,
  },
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylist(state, action) {
      state.playlist = action.payload;
      state.currentSongId = action.payload.songs[0]?.id ?? -1;
      state.currentSongIndex = 0;
    },
    setSelectBefore(state) {
      state.currentSongIndex = state.currentSongIndex - 1;
      state.currentSongId = state.playlist.songs[state.currentSongIndex].id;
    },
    setSelectNext(state) {
      state.currentSongIndex = state.currentSongIndex + 1;
      state.currentSongId = state.playlist.songs[state.currentSongIndex].id;
    },
    setSelectSong(state, action) {
      const song = action.payload;
      const index = state.playlist.songs.findIndex(
        (s) => s.id === song.id
      );
      state.currentSongIndex = index;
      state.currentSongId = song.id;
    },
    setPlaylistLiked(state, action) {
      state.playlist.liked = action.payload;
    },
    setPlaylistSongLike(state, action) {
      const song = state.playlist.songs.find(
        (song) => song.id === action.payload.id
      );
      if (song) {
        song.liked = action.payload.liked;
      }
    },
  },
});

export const {
  setPlaylist,
  setSelectBefore,
  setSelectNext,
  setPlaylistSongLike,
  setSelectSong,
  setPlaylistLiked,
} = playlistSlice.actions;

export default playlistSlice.reducer;

// Save playlist state to local storage
const setStateToLocalStoreage = async (state) => {
  const playlistState = state.playlist;
  const lastSongId = playlistState.currentSongId;
  const lastSongIndex = playlistState.currentSongIndex;
  const lastPlaylistId = playlistState.playlist.id;
  const lastPlayingInfo = {
    lastSongId,
    lastSongIndex,
    lastPlaylistId,
  };
  localStorage.setItem("lastPlayingInfo", JSON.stringify(lastPlayingInfo));
};

// Set playlist and play first song
export const setPlaylistAction = createAsyncThunk(
  "setPlaylistAction",
  async ({ playlist, setFirstSong = true }, { dispatch, getState }) => {
    dispatch(setPlaylist(playlist));
    const song = playlist.songs[0];
    if (setFirstSong && song) {
      dispatch(setNewAudio({ song: song, play: true }));
    }
    const state = getState();
    setStateToLocalStoreage(state);
  }
);

// Select previous song
export const selectBeforeSong = createAsyncThunk(
  "selectBeforeSong",
  async (payload, { getState, dispatch }) => {
    const state = getState();
    const playerState = state.playlist;
    const currentIndex = playerState.currentSongIndex;
    if (currentIndex === 0) return;
    const song = playerState.playlist.songs[currentIndex - 1];
    dispatch(setNewAudio({ song: song, play: true }));
    dispatch(setSelectBefore());

    setStateToLocalStoreage(state);
  }
);

// Select next song
export const selectNextSong = createAsyncThunk(
  "selectNextSong",
  async (payload, { getState, dispatch }) => {
    const state = getState();
    const playerState = state.playlist;
    const currentIndex = playerState.currentSongIndex;
    if (currentIndex === playerState.playlist.songs.length - 1) return;
    const song = playerState.playlist.songs[currentIndex + 1];
    dispatch(setNewAudio({ song: song, play: true }));
    dispatch(setSelectNext());

    setStateToLocalStoreage(state);
  }
);

// Change playlist and select a specific song
export const changePlaylistAndSongAction = createAsyncThunk(
  "changeSongAction",
  async ({ playlist, song }, { dispatch, getState }) => {
    dispatch(setPlaylist(playlist));
    dispatch(setNewAudio({ song: song, play: true }));
    dispatch(setSelectSong(song));

    const state = getState();
    setStateToLocalStoreage(state);
  }
);

// Load stored playlist and song from local storage
export const loadStoredPlaylist = createAsyncThunk(
  "loadStoredPlaylist",
  async (payload, { dispatch }) => {
    const lastPlayingInfoJSON = localStorage.getItem("lastPlayingInfo");
    if (!lastPlayingInfoJSON) return;

    const lastPlayingInfo = JSON.parse(lastPlayingInfoJSON);
    if (lastPlayingInfo.lastSongId === 0) return;

    const response = await getPlaylistDetail(lastPlayingInfo.lastPlaylistId);
    const playlist = response.data;
    if (lastPlayingInfo && playlist) {
      dispatch(setPlaylist(playlist));
      const storagedSong = playlist.songs[lastPlayingInfo.lastSongIndex];
      dispatch(setSelectSong(storagedSong));
      dispatch(setNewAudio({ song: storagedSong, play: false }));
    }
  }
);

// Like or unlike a song
export const toggleLikeSongAction = createAsyncThunk(
  "likeSongAction",
  async (songId, { dispatch, getState }) => {
    const state = getState();
    const playlistState = state.playlist;
    const song = playlistState.playlist.songs.find((song) => song.id === songId);
    if (!song) return;

    if (song.liked) {
      unlikeSong(songId).then(() => {
        dispatch(setPlaylistSongLike({ id: songId, liked: false }));
        dispatch(setPlayerSongLikedStatus(false));
      });
    } else {
      likeSong(songId).then(() => {
        dispatch(setPlaylistSongLike({ id: songId, liked: true }));
        dispatch(setPlayerSongLikedStatus(true));
      });
    }
  }
);

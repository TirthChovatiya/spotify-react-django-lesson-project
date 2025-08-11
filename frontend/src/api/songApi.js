import iaxios from "./iaxios";

export const getLikedPlaylists = () => {
    return iaxios.get('/liked-playlists/');
};

export const getPlaylists = () => {
    return iaxios.get('/playlists/');
};

export const getPlaylistDetail = (id) => {
    return iaxios.get(`/playlists/${id}/`);
};

export const likeSong = (id) => {
    return iaxios.post(`/like-song/${id}/`);
};

export const unlikeSong = (id) => {
    return iaxios.post(`/unlike-song/${id}/`);
};

export const likePlaylist = (id) => {
    return iaxios.post(`/like-playlist/${id}/`);
};

export const unlikePlaylist = (id) => {
    return iaxios.post(`/unlike-playlist/${id}/`);
};

export const getLikedSongs = () => {
    return iaxios.get('/liked-songs/');
};

export const getGenreList = () => {
    return iaxios.get('/genres/');
};

export const getGenreDetail = (id) => {
    return iaxios.get(`/genres/${id}/`);
};

export const searchSongs = (query) => {
    return iaxios.get(`/songs/?search=${query}`);
};

export const searchPlaylists = (query) => {
    return iaxios.get(`/playlists/?search=${query}`);
};

export const getArtistDetail = (id) => {
    return iaxios.get(`/artists/${id}/`);
};

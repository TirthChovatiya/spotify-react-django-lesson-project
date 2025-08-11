import iaxios from './iaxios';

/**
 * @typedef {Object} LoginParams
 * @property {string} user_info
 * @property {string} password
 * @property {boolean} remember_me
 */

/**
 * @typedef {Object} AuthInfo
 * @property {number} id
 * @property {number} user_id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} username
 * @property {string} email
 * @property {string} birth_date
 * @property {string} gender
 * @property {string} token
 * @property {boolean=} remember_me
 */

/**
 * @typedef {Object} CustomerProfile
 * @property {number} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} image
 * @property {string} birth_date
 * @property {string} gender
 * @property {any[]} liked_songs
 * @property {any[]} followed_artists
 * @property {any[]} playlists
 * @property {number} user_id
 */

/**
 * Login user
 * @param {LoginParams} data 
 * @returns {Promise<import('axios').AxiosResponse<AuthInfo>>}
 */
export function login(data) {
  return iaxios.post('/login/', data);
}

/**
 * @typedef {Object} RegisterParams
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {string} gender
 * @property {string} birth_date
 */

/**
 * Register a user
 * @param {RegisterParams} data 
 * @returns {Promise<import('axios').AxiosResponse<AuthInfo>>}
 */
export function register(data) {
  return iaxios.post('/register/', data);
}

/**
 * Fetch customer profile
 * @returns {Promise<import('axios').AxiosResponse<CustomerProfile>>}
 */
export function getProfile() {
  return iaxios.get('/customer-profile/');
}

/**
 * Upload profile photo
 * @param {File} file 
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function uploadProfilePhoto(file) {
  const formData = new FormData();
  formData.append('image', file);
  return iaxios.patch('/customer-image-upload/', formData);
}

/**
 * Follow an artist
 * @param {number} id 
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function followArtist(id) {
  return iaxios.post(`/follow-artist/${id}/`);
}

/**
 * Unfollow an artist
 * @param {number} id 
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function unfollowArtist(id) {
  return iaxios.post(`/unfollow-artist/${id}/`);
}

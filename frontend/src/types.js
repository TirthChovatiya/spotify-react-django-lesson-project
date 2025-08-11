/**
 * @typedef {Object} AuthorSummary
 * @property {number} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} username
 * @property {string} image
 */

/**
 * @typedef {Object} ArtistSummary
 * @property {number} id
 * @property {string} first_name
 * @property {string} last_name
 */

/**
 * @typedef {Object} Playlist
 * @property {number} id
 * @property {AuthorSummary} author
 * @property {string} title
 * @property {string} image
 * @property {string} color
 * @property {boolean} featured
 * @property {string} updated
 * @property {string} created
 * @property {boolean} hide
 */

/** @typedef {Playlist[]} PlaylistsType */

/**
 * @typedef {Object} Song
 * @property {number} id
 * @property {ArtistSummary[]} artists
 * @property {string[]} genres
 * @property {string} title
 * @property {string} image
 * @property {string} audio
 * @property {number} duration
 * @property {number} listen_count
 * @property {boolean} liked
 * @property {string} updated
 * @property {string} created
 */

/** @typedef {Song[]} SongsType */

/**
 * @typedef {Object} PlaylistDetail
 * @property {number} id
 * @property {AuthorSummary=} author
 * @property {string} title
 * @property {string=} image
 * @property {string=} color
 * @property {boolean=} featured
 * @property {string=} updated
 * @property {string=} created
 * @property {boolean=} hide
 * @property {SongsType} songs
 * @property {boolean=} liked
 */

/**
 * @typedef {Object} Artist
 * @property {number} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} image
 * @property {boolean} verified
 */

/** @typedef {Artist[]} ArtistsType */

/**
 * @typedef {Object} CustomerProfile
 * @property {number} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} image
 * @property {string} birth_date
 * @property {string} gender
 * @property {SongsType} liked_songs
 * @property {ArtistsType} followed_artists
 * @property {PlaylistsType} playlists
 * @property {number} user_id
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
 * @typedef {Object} GenreSummary
 * @property {number} id
 * @property {string} title
 * @property {string} color
 */

/** @typedef {GenreSummary[]} GenreSummariesType */

/**
 * @typedef {Object} GenreDetail
 * @property {number} id
 * @property {string} title
 * @property {string} color
 * @property {SongsType} songs
 * @property {string} created
 * @property {string} updated
 */

/**
 * @typedef {Object} ArtistDetail
 * @property {number} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} image
 * @property {string} cover
 * @property {boolean} verified
 * @property {SongsType} songs
 * @property {boolean} is_following
 */

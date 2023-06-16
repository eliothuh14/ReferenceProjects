export class Playlist{
    playlistID: string; //unsure what type this should be, assuming this is how we'll access a song to spotify? might need to ba url 
    albumCoverURL: string; //url for album cover pic 
    date: string;

    constructor(aPlaylistID : string, anAlbumCoverURL : string, aDate : string){
        this.playlistID = aPlaylistID;
        this.albumCoverURL = anAlbumCoverURL;
        this.date = aDate;
    }
}
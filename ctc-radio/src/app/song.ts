export interface Song{
    trackID: string; //unsure what type this should be, assuming this is how we'll access a song to spotify? might need to ba url 
    albumCoverURL: string; //url for album cover pic 
    title: string; 
    albumName: string; 
    artist: string; 
    timeAdded: string;
    votes: number;
    year: string;
    length: string;
}
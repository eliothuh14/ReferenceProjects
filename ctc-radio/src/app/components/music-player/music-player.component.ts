import { Component } from '@angular/core';
import { Song } from '../../song';
import { SpotifyService } from 'src/app/spotify.services';

const SONG_DATA: Song = {
    title: "Nikes",
    artist: "Frank Ocean",
    albumName:"Blonde",
    trackID: "1",
    year: "2016",
    albumCoverURL: "https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg", 
    timeAdded: "",
    votes: 1,
    length: '5:14',
};

@Component({
   templateUrl: './music-player.component.html',
   styleUrls: ['./music-player.component.css'],
   selector: 'music-player',
})

export class MusicPlayerComponent {
    song = SONG_DATA;
    barValue = '50';
    songCurrLength = '1:00';
    username = "Username";
    vol = 'Mute';
    curSeconds = 0;

    constructor(public service:SpotifyService){}
   
    getImageSrc() {
        return this.song.albumCoverURL;
    }

    updateCurrLength(){
        this.curSeconds = this.curSeconds + 1;
        var d = new Date(0,0,0,0,0,0,0);
        d.setSeconds(this.curSeconds);
        var s = d.toTimeString();
        var songCurrLength = s.substring(3,8); 
        this.songCurrLength = s;
    }

    changeVol() {
        if (this.vol=='Mute') {
            this.service.changeVolume('0');
            this.vol = 'Unmute';
        }
        else {
            this.service.changeVolume('50');
            this.vol = 'Mute';
        }
    }

}
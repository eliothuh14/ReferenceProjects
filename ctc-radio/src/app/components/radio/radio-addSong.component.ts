import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpotifyService } from 'src/app/spotify.services';
import { RadioComponent } from './radio.component';

@Component({
   templateUrl: './radio-addSong.component.html',
   styleUrls: ['./radio-addSong.component.css'],
   selector: 'radio-addSong',
})

export class RadioAddSongComponent implements OnInit{
   constructor(public service:SpotifyService, 
    public dialogRef: MatDialogRef<RadioAddSongComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any){}

    ngOnInit(){
        console.log(this.data);
    }

    onSubmitCreate() {
        this.service.addTracktoQueue(this.data.uri);
        console.log(this.data.uri);
        alert("Added to Queue!")
     }
  
}
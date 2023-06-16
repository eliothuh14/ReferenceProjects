import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Track } from './track';
import { map } from 'rxjs/operators';
import { PlaylistSpot } from './playlistSpot';
import { Items } from './items';

interface Token {
  accessToken: string
}

@Injectable()
export class SpotifyService {
  private url: string;
  constructor(private _http: HttpClient) {}

  getAuthToken() {
    // this._http.get<Token[]>('http://localhost:3000/auth/token').subscribe(data => {
    //   this.token = { accessToken: data['accessToken']};
    //   console.log(this.token.accessToken);
    // });

    return "BQDJiHtM34GQpNDL5wN-uvxNq8mt53SEbUby1G6FmILlvN7QoTvf7v3OqNBHhOHDK4oO7Giacv4CsaTslh4sGhLnpeCBpWgFJ6YAftXWkAY1T7AZc4edRCOK8RQfg26yCmKDq8siKzVWlB6-MJBpS6z8IFzXduY8VIN5CQjQydeCpUs-DjvCC6BRh9ymOtz-DhI8TwUVv7uEnDtTeSamHQnXuknDK0n58VpznYW57M38X8Th-QJf3BiTzyiq1UZG9ZHQLXe3vqOe1RAJKw";

  }
 
  // Get search results for song
  searchSongTest(keyword: string, type = 'track', limit: number, authToken: string) {
      let headers = new HttpHeaders({
        'Authorization': 'Bearer '+ 'BQDV19SV0s3X0jMScP7FeQVgAeQny0Em9g5ZN_ea2a7zPyNTJSTM0caCjNfedrsF2Gb6kxHcEb0oei-vOLDIsqQd4HYHJl_4WJSU94gqyG5kAGeyL_vFFdlIzapOin3wqs6BdSqCWh8L',
      });
      this.url = 'https://api.spotify.com/v1/search?q='+keyword+'&type='+type+'&market=US&limit='+limit;
      console.log(this.url);
      return this._http.get<Track[]>(this.url, {headers:headers});
  }

  searchSong(keyword: string, type = 'track', limit: number) {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.getAuthToken(),
    });
    this.url = 'https://api.spotify.com/v1/search?Q='+keyword+'&type='+type+'&market=US&limit='+limit;
    return this._http.get<Track[]>(this.url, {headers:headers});
  }

  // Get data about artist
  getArtist(artist_id: string) {
    let headers = new HttpHeaders({
        'Authorization': 'Bearer '+this.getAuthToken(),
    });

    this.url = 'https://api.spotify.com/v1/artists/' + artist_id;
    return this._http.get(this.url, { headers: headers });
  }

  // Get Tracks in ablum selected
  getAlbum(album_id: string) {
    let headers = new HttpHeaders({
        'Authorization': 'Bearer '+this.getAuthToken(),
    });

    this.url = 'https://api.spotify.com/v1/albums/' + album_id + '/tracks';

    return this._http.get(this.url, { headers: headers });
  }

  // get info of a track
  getTrack(track_id: string) {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.getAuthToken(),
    });
    this.url = 'https://api.spotify.com/v1/tracks/' + track_id;
    return this._http.get(this.url, {headers: headers});
  }

  //get info from all tracks in a playlist
  getPlaylist(playlist_id: string) {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer '+ 'BQCfdHfr0SEqWIZg9-rJ6TIg-ZMjOuXqjO7sVWmAXHj0hme0JsWTE8y1GfgbQjh9eAGxdXZ185QraFFTShQJg4rRYvm-SvgEE81-iHWxJXawRqK79rA3g7qoAwFrEgwwzNDdTikZDe9UX1Zg7vtSUyaVF__lWlItCi4SRYZicQIIExa-AprYsBF3M_07gzpQJ08r2Mnykt89CbxDctJm1qHJwAva4tR4LNCDMnGdcAR-BatPYrxpmLiQRQ7VTTlxgYPkGOxIBgHp1FSCCpM',
    });
    this.url = 'https://api.spotify.com/v1/playlists/' + playlist_id + '/tracks';
    return this._http.get<Items[]>(this.url, {headers: headers}); 
  }

  // create playlist on emily's account (for now)
  createPlaylist(user_id: string, playlist_name:string) {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer '+'BQBC5m6aQ8GCPXm5vNiZTDlnDxeViB_3Rm-Tt97mxvn2KK04N4-H949d4XAR_KhUFBKi1G8uY9md_ecUqL-mPIL7Jn7knl_kZMibZG-ctvuditDjY3b89rGsoWPIxmfhTcpwPUN_m60JsKyqu6YywR4dAiGutEGSnUhyUtDt63gAn_yAlNrzUV5asEvTbM5a0gvXHbQyqvE4n4E6fVkK5J2q9MEk8BL9jAsTw9ARmlhGedyuQt_CjcsqufLwI93gVvoSC1GLbpDcmM812FM',
      'Content-Type': 'application/json'
    });
    let body = {
      'name': playlist_name,
      'description': 'Created by CTC Radio',
      'public': 'true'
    };
    this.url = 'https://api.spotify.com/v1/users/' + user_id + '/playlists';
    return this._http.post<PlaylistSpot>(this.url, body, {headers: headers});
  }

  // can add one or more tracks to specified playlist.
  addTracksToPlaylist(playlist_id: string, uris: string[]) {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer '+'BQB_oZ3PZ1PvwmWtFaK6ljhhjKhD1soY58PxV2ZkfMsxhc0MpVTxaShifFHNdfxz3G3sDxUpS6ZBNq0-IXQOR_NJxUdzCYMvkC-SHN0LyabfDhoauK1gk2u7J_q0gzpBGKLhYvdA5jk-pU7QrijPqFmmajWKeLhc89S_9gI_axS8aKg4S2fXyTwBRoBqGltairODyA0SNwallekR2DO7yaLqKcwjkhaIo9Kp6DbYnfB9xRpS4zPkf3KXiWTq6rSqU2rrie4Inu6tTX80684',
      'Content-Type': 'application/json'
    });
    let body = {
      'uris': uris
    }
    this.url = 'https://api.spotify.com/v1/playlists/'+playlist_id+'/tracks';
    return this._http.post<string>(this.url, body, {headers: headers});
  }

  //add track to queue on your spotify
  addTracktoQueue(uri:string){
    let headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.getAuthToken(),
    });
    console.log("uri: ", uri); 
    this.url = 'https://api.spotify.com/v1/me/player/queue?uri='+uri;
    return this._http.post(this.url, {headers: headers});

  }

  //change queue order
  updateQueue() {
    
  }

  //change volume of currently playing song. volume goes from 0 - 100. mute is 0.
  changeVolume(volume: string) {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer '+this.getAuthToken(),
    });
    this.url = 'https://api.spotify.com/v1/me/player/volume?volume_percent='+volume;
    return this._http.put(this.url, {headers: headers});
  }

}
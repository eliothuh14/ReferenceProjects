import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RadioComponent } from './components/radio/radio.component';
import { DailyPlaylistsComponent } from './components/daily-playlists/daily-playlists.component';
import { PlaylistPopupComponent } from './components/playlist-popup/playlist-popup.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule, MatProgressBar } from '@angular/material/progress-bar';
import { RadioAddSongComponent } from './components/radio/radio-addSong.component';

import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SpotifyService } from './spotify.services';


@NgModule({
  declarations: [
    AppComponent,
    RadioComponent,
    LoginComponent,
    DailyPlaylistsComponent,
    PlaylistPopupComponent,
    MusicPlayerComponent,
    RadioAddSongComponent,
    CreateAccountComponent,
    LogoutComponent,

  ],
  imports: [    
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    MatProgressBarModule,

  ],
  providers: [
    SpotifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

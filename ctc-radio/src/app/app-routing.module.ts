import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from '../app/components/about/about.component';
import { RadioComponent } from './components/radio/radio.component';
import { DailyPlaylistsComponent } from './components/daily-playlists/daily-playlists.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'radio', component: RadioComponent},
  {path: 'daily-playlists', component: DailyPlaylistsComponent},
  {path: 'create-account', component: CreateAccountComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
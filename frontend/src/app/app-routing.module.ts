import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GamesComponent } from './games/games.component'; // Cambiado de 'SongsComponent' a 'GamesComponent'
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
// import { SongPlayerComponent } from './song-player/song-player.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'song-player', component: SongPlayerComponent },
  // { path: 'song-player/:songId', component: SongPlayerComponent },
  { path: 'games', component: GamesComponent, canActivate: [AuthGuard] }, // Cambiado de 'songs' a 'games'
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

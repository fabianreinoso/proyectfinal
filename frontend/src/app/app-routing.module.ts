/* This is the routing module for an Angular application that defines the routes for different
components such as login, games, register, and upload. */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GamesComponent } from './games/games.component'; 
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'games', component: GamesComponent, canActivate: [AuthGuard] }, 
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

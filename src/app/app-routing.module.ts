import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { GuestGuard } from './guards/guest/guest.guard'
import { AuthGuard } from './guards/auth/auth.guard'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VideoConferenceComponent } from './pages/video-conference/video-conference.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'video-conference', component: VideoConferenceComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // redirect to `login`
  { path: '**', redirectTo: '/login' },  // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

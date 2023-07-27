import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PoemsComponent } from './poems/poems.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthLoginActivate } from './home/guard/auth.login.activate';
import { ProfileComponent } from './profile/profile.component';
import { AuthActivate } from './home/guard/auth.activate';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'poems',
    component: PoemsComponent
  },  
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthLoginActivate]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthLoginActivate]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthActivate]
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

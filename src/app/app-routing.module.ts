import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PoemsComponent } from './poems/poems.component';
import { UserComponent } from './user/user/user.component';
import { NewPoemComponent } from './poems/new-poem/new-poem.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
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
    path: 'users',
    component: UserComponent,
    canActivate: [AuthActivate]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

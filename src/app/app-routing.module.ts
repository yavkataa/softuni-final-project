import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PoemsComponent } from './poems/poems.component';
import { UserComponent } from './user/user/user.component';
import { NewPoemComponent } from './poems/new-poem/new-poem.component';

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
    component: UserComponent
  },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

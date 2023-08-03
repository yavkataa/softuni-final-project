import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPoemComponent } from './new-poem/new-poem.component';
import { PoemComponent } from './poem/poem.component';
import { PoemsComponent } from './poems.component';
import { HomeComponent } from '../home/home.component';
import { AuthActivate } from '../home/guard/auth.activate';
import { MyPoemsComponent } from './my-poems/my-poems.component';

const routes: Routes = [
  {
    path: 'poems',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'new-poem',
        component: NewPoemComponent,
        canActivate: [AuthActivate],
      },
      {
        path: 'my-poems',
        component: MyPoemsComponent,
        canActivate: [AuthActivate],
      },
      {
        path: ':id',
        component: PoemComponent,
      },
      {
        path: 'my-poems/:id',
        component: PoemComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoemRoutingModule {}

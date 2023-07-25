import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { PoemsComponent } from './poems/poems.component';
import { HomeComponent } from './home/home.component';
import { PoemCardComponent } from './poems/poem-card/poem-card.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PoemsComponent,
    HomeComponent,
    PoemCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

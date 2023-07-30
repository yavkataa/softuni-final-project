import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { PoemsComponent } from './poems/poems.component';
import { HomeComponent } from './home/home.component';
import { PoemCardComponent } from './poems/poem-card/poem-card.component';
import { NewPoemComponent } from './poems/new-poem/new-poem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoemRoutingModule } from './poems/poems-routing.module';
import { PoemComponent } from './poems/poem/poem.component';
import { NavigationComponent } from './home/navigation/navigation.component';
import { MyPoemsComponent } from './poems/my-poems/my-poems.component';
import { UserModule } from './user/user/user.module';
import { EditPoemComponent } from './poems/edit-poem/edit-poem.component';

/* import { appInterceptorProvider } from './app-interceptor'; */

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PoemsComponent,
    HomeComponent,
    PoemCardComponent,
    NewPoemComponent,
    PoemComponent,
    NavigationComponent,
    MyPoemsComponent,
    EditPoemComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PoemRoutingModule,    
    FormsModule,
    ReactiveFormsModule,
    UserModule
    
  ],
  providers: [/* appInterceptorProvider */],
  bootstrap: [AppComponent]
})
export class AppModule { }

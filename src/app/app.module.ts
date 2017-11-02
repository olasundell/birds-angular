import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {AudioComponent} from './audio.component';
import {BirdComponent} from './bird.component';

@NgModule({
  declarations: [
      AppComponent,
      AudioComponent,
      BirdComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

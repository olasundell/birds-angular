import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {AudioComponent} from './audio.component';
import {BirdComponent} from './bird.component';
import {RegionComponent} from './region.component';
import {LanguageComponent} from './language.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
      AppComponent,
      AudioComponent,
      BirdComponent,
      LanguageComponent,
      RegionComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

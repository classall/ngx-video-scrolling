import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxVideoScrollingModule } from 'projects/ngx-video-scrolling/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxVideoScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
